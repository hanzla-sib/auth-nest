import { Body, Controller, Post } from '@nestjs/common';
import { CreateuserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('register')
  async registerUser(@Body() body: CreateuserDto) {
    return await this.userService.create(body);
  }
  @Post('login')
  async loginUser(@Body() body: AuthDto) {
    return await this.authService.login(body);
  }
}
