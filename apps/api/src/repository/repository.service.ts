import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RepositoryDto } from './dto/repository.dto';

@Injectable()
export class RepositoryService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(RepositoryService.name);
  }

  async getRepositoryById(repositoryId: string) {
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

  async createRepository(repository: Omit<RepositoryDto, 'id' | 'createdAt' | 'updatedAt'>) {
    return await this.prisma.repository.create({
      data: repository,
    });
  }

  async updateRepository(repository: RepositoryDto) {
    return await this.prisma.repository.update({
      where: { id: repository.id },
      data: repository,
    });
  }

  async deleteRepository(repositoryId: string) {
    return await this.prisma.repository.delete({
      where: { id: repositoryId },
    });
  }
}
