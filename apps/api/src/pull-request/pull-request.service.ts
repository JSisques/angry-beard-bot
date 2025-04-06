import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PullRequestDto } from './dto/pull-request.dto';
import { CreatePullRequestDto } from './dto/create-pull-request.dto';
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
