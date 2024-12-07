import { Body, Controller, Post } from '@nestjs/common';
import { CreateuserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Post('register')
  async registerUser(@Body() body: CreateuserDto) {
    return await this.userService.create(body);
  }
}
