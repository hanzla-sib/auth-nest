import { Module, Controller } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({})
export class AuthModule {
  // AuthModule for import all the services and controllers
  Controller: [AuthController];
  providers: [AuthService, PrismaService, JwtService];
    // Import all the services
  imports: [UserService];
}
