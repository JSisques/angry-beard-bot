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
    this.logger.debug(`Getting user by id: ${id}`);
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string) {
    this.logger.debug(`Getting user by email: ${email}`);
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async getUserByGithubId(githubId: string) {
    this.logger.debug(`Getting user by github id: ${githubId}`);
    return this.prismaService.user.findUnique({ where: { githubId } });
  }

  async getUserByProviderId(providerId: string) {
    this.logger.debug(`Getting user by provider id: ${providerId}`);
    const user = await this.prismaService.user.findUnique({ where: { providerId } });
    this.logger.debug(`User found: ${JSON.stringify(user)}`);
    return user;
  }

  async createUser(user: CreateUserDto) {
    this.logger.debug(`Creating user: ${user}`);
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
    this.logger.debug(`Updating user: ${user}`);
    return this.prismaService.user.update({ where: { id }, data: user });
  }

  async deleteUser(id: string) {
    this.logger.debug(`Deleting user: ${id}`);
    return this.prismaService.user.delete({ where: { id } });
  }
}
