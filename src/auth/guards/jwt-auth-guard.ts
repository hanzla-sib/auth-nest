import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
@Injectable()
export class JwtGuard implements CanActivate {
  // JwtGuard for check if user is autorise to access the Api service
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Extract token from request
    const token = this.extractToken(request);
    // If token is not found, throw UnauthorizedException
    if (!token) {
      // UnauthorizedException is a built-in exception class
      throw new UnauthorizedException();
    }
    try {
      // Verify token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.jwtSecretKey,
      });
      // Attach user object to request object
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    // Return true if user is authorized
    return true;
  }

  private extractToken(request: Request) {
    // Extract token from Authorization header
    const authorization = request.headers.authorization;
    // If Authorization header is not found, return null
    if (!authorization) {
      return null;
    }

    const [type, token] = authorization.split(' ');
    // If token type is not Bearer or token is not found, return null
    if (type !== 'Bearer' || !token) {
      // Return null if token type is not Bearer or token is not found
      return null;
    }
    return token;
  }
}
