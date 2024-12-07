import { Module, Controller } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

import { PrismaService } from 'src/prisma.service';

@Module({})
export class AuthModule {
  Controller: [AuthController];
  providers: [AuthService, PrismaService];
  imports: [UserService];
}
