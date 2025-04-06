import { Controller, Get, Param, Post, Body, Put, Delete, Logger } from '@nestjs/common';
import { PullRequestService } from './pull-request.service';
import { PullRequestDto } from './dto/pull-request.dto';

@Controller('pull-request')
export class PullRequestController {
  private readonly logger;
  constructor(private readonly pullRequestService: PullRequestService) {
    this.logger = new Logger(PullRequestController.name);
  }

  @Get(':id')
  async getPullRequestById(@Param('id') id: string) {
    this.logger.debug(`Getting pull request by id: ${id}`);
    return this.pullRequestService.getPullRequestById(id);
  }

  @Post()
  async createPullRequest(@Body() pullRequestDto: PullRequestDto) {
    this.logger.debug(`Creating pull request: ${pullRequestDto}`);
    return this.pullRequestService.createPullRequest(pullRequestDto, pullRequestDto.repositoryId);
  }

  @Put(':id')
  async updatePullRequest(@Param('id') id: string, @Body() pullRequestDto: PullRequestDto) {
    this.logger.debug(`Updating pull request: ${pullRequestDto}`);
    return this.pullRequestService.updatePullRequest(pullRequestDto);
  }

  @Delete(':id')
  async deletePullRequest(@Param('id') id: string) {
    this.logger.debug(`Deleting pull request: ${id}`);
    return this.pullRequestService.deletePullRequest(id);
  }
}
