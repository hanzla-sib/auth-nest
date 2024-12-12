import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth-guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // Use JwtGuard to protect the route
  @UseGuards(JwtGuard)
  // Get user profile by id
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    // Find user by id
    return await this.userService.findById(id);
  }
}
