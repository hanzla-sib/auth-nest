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
  // Register user
  @Post('register')
  // Use CreateuserDto for validation
  async registerUser(@Body() body: CreateuserDto) {
    // Call create method from UserService
    return await this.userService.create(body);
  }
  // Login user
  @Post('login')
  // Use AuthDto for validation
  async loginUser(@Body() body: AuthDto) {
    // Call login method from AuthService
    return await this.authService.login(body);
  }
}
