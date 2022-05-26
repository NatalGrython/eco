import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { registrationDto } from './dto/registration.dto';
import { vkAuthDto } from './dto/vkAuth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() loginUserDto: loginDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('/registration')
  registration(@Body() registrationUserDto: registrationDto) {
    return this.authService.registration(registrationUserDto);
  }

  @Post('/vk')
  vkAuth(@Body() vkAuthorizationDto: vkAuthDto) {
    return this.authService.vkAuthorization(vkAuthorizationDto);
  }
}
