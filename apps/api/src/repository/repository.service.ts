import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RepositoryDto } from './dto/repository.dto';
import { BotLevel } from '@prisma/client';

@Injectable()
export class RepositoryService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(RepositoryService.name);
  }

  async getRepositoryById(repositoryId: string) {
    this.logger.debug(`Getting repository by id: ${repositoryId}`);
    return await this.prisma.repository.findUnique({
      where: {
        id: repositoryId,
      },
    });
  }

  async getRepositoryByGithubId(githubId: string) {
    this.logger.debug(`Checking if repository ${githubId} exists`);
    return await this.prisma.repository.findUnique({
      where: {
        githubId: githubId,
      },
    });
  }

  async createRepository(repository: RepositoryDto, userId: string) {
    this.logger.debug(`Creating repository: ${repository}`);
    return await this.prisma.repository.create({
      data: {
        name: repository.name,
        url: repository.url,
        language: repository.language,
        hasWiki: repository.hasWiki,
        githubId: repository.githubId,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        owner: true,
      },
    });
  }

  async updateRepository(repository: RepositoryDto) {
    this.logger.debug(`Updating repository: ${repository}`);
    return await this.prisma.repository.update({
      where: { id: repository.id },
      data: {
        name: repository.name,
        url: repository.url,
        language: repository.language,
        hasWiki: repository.hasWiki,
        githubId: repository.githubId,
      },
    });
  }

  async deleteRepository(repositoryId: string) {
    this.logger.debug(`Deleting repository: ${repositoryId}`);
    return await this.prisma.repository.delete({
      where: { id: repositoryId },
    });
  }
}
