import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateuserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async create(body: CreateuserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });
    if (user) {
      throw new Error('User already exists');
    }
    const newUSer = await this.prismaService.user.create({
      data: {
        ...body,
        password: await hash(body.password, 10),
      },
    });
    const { password, ...result } = newUSer;
    return result;
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
     const data=await this.prismaService.user.findUnique({
      where: { id: id },
    });
    const { password, ...result } = data;
    return result;
  }
}
