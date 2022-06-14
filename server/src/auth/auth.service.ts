import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { User } from 'src/entities/user';
import { UserService } from 'src/user/user.service';
import { loginDto } from './dto/login.dto';
import { registrationDto } from './dto/registration.dto';
import { vkAuthDto } from './dto/vkAuth.dto';

interface Params {
  [key: string]: string;
}

export const queryBuilder = (initialUrl: string, params: Params) => {
  const url = new URL(initialUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  async login(loginUserDto: loginDto) {
    const user = await this.validateUser(loginUserDto);
    return this.generateToken(user, 'default');
  }

  async registration(registrationUserDto: registrationDto) {
    const candidate = await this.userService.findByLogin(
      registrationUserDto.login,
    );
    if (candidate) {
      throw new HttpException('Not', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await hash(registrationUserDto.password, 5);
    const user = await this.userService.createUser({
      ...registrationUserDto,
      password: hashPassword,
    });
    return this.generateToken(user, 'default');
  }

  async vkAuthorization(vkAuthorizationDto: vkAuthDto) {
    try {
      const { data: authData } = await this.getVkAccessToken(
        vkAuthorizationDto.code,
      );

      const user = await this.userService.findByLogin(authData.email);

      if (user) {
        return this.generateToken(user, 'oauth');
      }

      const { data: vkUserData } = await this.getUserDataVk(
        authData.user_id,
        authData.access_token,
      );

      const userData = vkUserData.response[0];

      const currentUser = await this.userService.createUser({
        login: authData.email,
        imagePath: userData.photo_max_orig,
        name: userData.first_name,
      });

      return this.generateToken(currentUser, 'oauth');
    } catch (error) {
      console.log(error);
    }
  }

  private getVkAccessToken(code: string) {
    const VKDATA = {
      client_id: process.env.VK_ID,
      client_secret: process.env.VK_SECRET,
      client_host: process.env.CLIENT_HOST,
      client_port: process.env.CLIENT_PORT,
    };

    const url = queryBuilder('https://oauth.vk.com/access_token', {
      client_id: VKDATA.client_id,
      client_secret: VKDATA.client_secret,
      redirect_uri: `http://${VKDATA.client_host}:${VKDATA.client_port}/auth/vk`,
      code: code,
      v: '5.131',
    });

    return this.httpService.get(url).toPromise();
  }

  private getUserDataVk(userId: string, token: string) {
    const url = queryBuilder('https://api.vk.com/method/users.get', {
      user_ids: userId,
      fields: [
        'photo_max_orig',
        'has_mobile',
        'home_town',
        'contacts',
        'mobile_phone',
      ].join(','),
      access_token: token,
      v: '5.131',
    });

    return this.httpService.get(url).toPromise();
  }

  private generateToken(user: User, authType: string) {
    const payload = {
      id: user.id,
      login: user.login,
      role: user.role,
      authType,
    };

    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(loginUserDto: loginDto) {
    const candidate = await this.userService.findByLogin(loginUserDto.login);
    if (candidate) {
      const passwordEquals = await compare(
        loginUserDto.password,
        candidate?.password,
      );
      if (passwordEquals) {
        return candidate;
      }
      throw new HttpException(
        'Ne valid password or email',
        HttpStatus.UNAUTHORIZED,
      );
    }
    throw new HttpException(
      'Ne valid password or email',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
