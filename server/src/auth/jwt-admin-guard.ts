import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      const [type, token] = authHeader.split(' ');

      if (type !== 'Bearer' && !token) {
        throw new UnauthorizedException({ message: 'Not auth' });
      }

      const user = this.jwtService.verify(token);
      if (user.role === 'admin') {
        request.user = user;

        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new UnauthorizedException({ message: 'Not auth' });
    }
  }
}
