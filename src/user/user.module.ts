import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  //
  providers: [UserService, PrismaService,JwtService],
  
  controllers: [UserController],
  // Export UserService
  // UserService is exported so that it can be used in other modules
  // that import UserModule
  // For example, AuthModule imports UserModule to use UserService
  // to find user by email
  // UserService is also exported so that it can be used in UserController
  exports: [UserService],
})
export class UserModule {}
