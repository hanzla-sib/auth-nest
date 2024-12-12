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
    // Validate user
    const user = await this.validateUser(body);
    // Create payload
    const payload = { email: user.email, sub: { name: user.name } };

    return {
      // Return user and tokens
      user,
      backendTokens: {
        // Generate access token
        // expiresIn is set to 1 hour
        // secret is set to jwtSecretKey
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.jwtSecretKey,
        }),
        // Generate refresh token
        // expiresIn is set to 7 days
        // secret is set to jwtRefreshTokenKey
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
      },
    };
  }

  async validateUser(body: AuthDto) {
    // Find user by email
    const userEmail = body.email;
    // Check if user is valid

    const isUserValidate = await this.userService.findByEmail(userEmail);
    if (
      // Check if user is valid
      isUserValidate &&
      // Compare password
      (await compare(body.password, isUserValidate.password))
    ) {
      // Return user if valid
      // Destructure password from user object
      const { password, ...result } = isUserValidate;
      
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
