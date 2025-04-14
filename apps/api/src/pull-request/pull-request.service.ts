import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PullRequestDto } from './dto/pull-request.dto';
import { CreatePullRequestDto } from './dto/create-pull-request.dto';
import { Repository } from '@prisma/client';
@Injectable()
export class PullRequestService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(PullRequestService.name);
  }

  async getPullRequestById(id: string) {
    this.logger.debug(`Getting pull request by id: ${id}`);
    return this.prisma.pullRequest.findUnique({
      where: { id },
    });
  }

  async getPullRequestByGithubId(githubId: string) {
    this.logger.debug(`Getting pull request by github id: ${githubId}`);
    return this.prisma.pullRequest.findUnique({
      where: { githubId },
    });
  }

  async getPullRequestsByRepositoryId(repositoryId: string) {
    this.logger.debug(`Getting pull requests by repository id: ${repositoryId}`);
    return this.prisma.pullRequest.findMany({
      where: { repositoryId },
    });
  }

  async getPullRequestsByRepositories(repositories: Repository[], page: number) {
    this.logger.debug(`Getting pull requests by repositories: ${repositories.map(repository => repository.id)}`);
    return this.prisma.pullRequest.findMany({
      where: { repositoryId: { in: repositories.map(repository => repository.id) } },
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  async createPullRequest(pullRequestDto: CreatePullRequestDto, repositoryId: string) {
    this.logger.debug(`Creating pull request: ${pullRequestDto}`);
    return this.prisma.pullRequest.create({
      data: {
        ...pullRequestDto,
        repository: {
          connect: {
            id: repositoryId,
          },
        },
      },
    });
  }

  async updatePullRequest(pullRequestDto: PullRequestDto) {
    this.logger.debug(`Updating pull request: ${pullRequestDto}`);
    return this.prisma.pullRequest.update({
      where: { id: pullRequestDto.id },
      data: pullRequestDto,
    });
  }

  async deletePullRequest(id: string) {
    this.logger.debug(`Deleting pull request: ${id}`);
    return this.prisma.pullRequest.delete({
      where: { id },
    });
  }
}
