import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  private readonly logger;

  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(UserService.name);
  }

  async getUserById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async createUser(user: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...user,
        subscription: {
          create: {
            plan: 'FREE',
            status: 'ACTIVE',
            startDate: new Date(),
          },
        },
      },
      include: {
        subscription: true,
      },
    });
  }

  async updateUser(id: string, user: User) {
    return this.prismaService.user.update({ where: { id }, data: user });
  }

  async deleteUser(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
