import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateuserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { refreshGuard } from './guards/refresh-guard';

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

  // Refresh token
  @UseGuards(refreshGuard)
  @Post('refresh')
  // Use AuthDto for validation
  async refreshToken(@Request() req: any) {

    
    // Call login method from AuthService
    return await this.authService.refreshToken(req.user);
  }
}
