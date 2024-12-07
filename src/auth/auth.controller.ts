import { Body, Controller, Post } from '@nestjs/common';
import { CreateuserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Post('register')
  async registerUser(@Body() body: CreateuserDto) {
    return await this.userService.create(body);
  }
  @Post('login')
  async loginUser(@Body() body: AuthDto) {
   
  }
}
