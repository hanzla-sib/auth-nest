import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(body: AuthDto) {
    const user = await this.validateUser(body);
    const payload = { email: user.email, sub: { name: user.name } };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
      },
    };
  }

  async validateUser(body: AuthDto) {
    const userEmail = body.email;

    const isUserValidate = await this.userService.findByEmail(userEmail);
    if (
      isUserValidate &&
      (await compare(body.password, isUserValidate.password))
    ) {
      const { password, ...result } = isUserValidate;
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
