import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login(body: AuthDto) {
    const user = await this.validateUser(body);
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
