import { Injectable, Logger } from '@nestjs/common';
import { BotLevel, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Service responsible for handling user-related operations
 */
@Injectable()
export class UserService {
  private readonly logger;

  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(UserService.name);
  }

  /**
   * Retrieves a user by their ID
   * @param id - The unique identifier of the user
   * @returns The user if found, null otherwise
   */
  async getUserById(id: string) {
    this.logger.debug(`Getting user by id: ${id}`);
    return this.prismaService.user.findUnique({ where: { id } });
  }

  /**
   * Retrieves a user by their Supabase ID including related data
   * @param supabaseId - The Supabase identifier of the user
   * @returns The user with subscription, repositories, bot config and review count if found, null otherwise
   */
  async getUserBySupabaseId(supabaseId: string) {
    this.logger.debug(`Getting user by supabase id: ${supabaseId}`);
    return this.prismaService.user.findUnique({
      where: { supabaseId },
      include: {
        subscription: true,
        repositories: true,
        botConfig: true,
        _count: { select: { reviews: true } },
      },
    });
  }

  /**
   * Retrieves a user by their email address
   * @param email - The email address of the user
   * @returns The user if found, null otherwise
   */
  async getUserByEmail(email: string) {
    this.logger.debug(`Getting user by email: ${email}`);
    return this.prismaService.user.findUnique({ where: { email } });
  }

  /**
   * Retrieves a user by their GitHub ID
   * @param githubId - The GitHub identifier of the user
   * @returns The user if found, null otherwise
   */
  async getUserByGithubId(githubId: string) {
    this.logger.debug(`Getting user by github id: ${githubId}`);
    return this.prismaService.user.findUnique({ where: { githubId } });
  }

  /**
   * Retrieves a user by their provider ID including related data
   * @param providerId - The provider identifier of the user
   * @returns The user with subscription, bot config and review count if found, null otherwise
   */
  async getUserByProviderId(providerId: string) {
    this.logger.debug(`Getting user by provider id: ${providerId}`);
    const user = await this.prismaService.user.findUnique({
      where: { providerId },
      include: { subscription: true, botConfig: true, _count: { select: { reviews: true } } },
    });
    this.logger.debug(`User found: ${JSON.stringify(user)}`);
    return user;
  }

  /**
   * Creates a new user with default subscription and bot configuration
   * @param user - The user data transfer object containing user information
   * @returns The created user with subscription, bot config, repositories and review count
   */
  async createUser(user: CreateUserDto) {
    this.logger.debug(`Creating user: ${JSON.stringify(user)}`);
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
        botConfig: {
          create: {
            grumpinessLevel: BotLevel.MODERATE,
            technicalityLevel: BotLevel.MODERATE,
            detailLevel: BotLevel.MODERATE,
          },
        },
      },
      include: {
        subscription: true,
        botConfig: true,
        repositories: true,
        _count: { select: { reviews: true } },
      },
    });
  }

  /**
   * Updates an existing user's information
   * @param id - The unique identifier of the user to update
   * @param user - The updated user data
   * @returns The updated user
   */
  async updateUser(id: string, user: User) {
    this.logger.debug(`Updating user: ${JSON.stringify(user)}`);
    return this.prismaService.user.update({ where: { id }, data: user });
  }

  /**
   * Deletes a user from the system
   * @param id - The unique identifier of the user to delete
   * @returns The deleted user
   */
  async deleteUser(id: string) {
    this.logger.debug(`Deleting user: ${id}`);
    return this.prismaService.user.delete({ where: { id } });
  }
}
