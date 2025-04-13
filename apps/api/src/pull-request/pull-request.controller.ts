import { Controller, Get, Param, Post, Body, Put, Delete, Logger } from '@nestjs/common';
import { PullRequestService } from './pull-request.service';
import { PullRequestDto } from './dto/pull-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
@ApiTags('Pull Requests')
@Controller('pull-request')
export class PullRequestController {
  private readonly logger;
  constructor(
    private readonly pullRequestService: PullRequestService,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger(PullRequestController.name);
  }

  @ApiOperation({
    summary: 'Get pull request by ID',
    description: 'Retrieves a pull request using its unique identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Pull request found successfully',
  })
  @ApiResponse({ status: 404, description: 'Pull request not found' })
  @Get(':id')
  async getPullRequestById(@Param('id') id: string) {
    this.logger.debug(`Getting pull request by id: ${id}`);
    return this.pullRequestService.getPullRequestById(id);
  }

  @ApiOperation({
    summary: 'Get pull requests by user ID',
    description: 'Retrieves all pull requests for a specific user',
  })
  @ApiResponse({
    status: 200,
    description: 'Pull requests retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'No pull requests found' })
  @Get('user/:supabaseId')
  async getPullRequestsBySupabaseId(@Param('supabaseId') supabaseId: string) {
    this.logger.debug(`Getting pull requests by user id: ${supabaseId}`);
    const user = await this.userService.getUserBySupabaseId(supabaseId);
    return this.pullRequestService.getPullRequestsByRepositories(user.repositories);
  }

  @ApiOperation({
    summary: 'Create new pull request',
    description: 'Creates a new pull request with the provided data',
  })
  @ApiResponse({
    status: 201,
    description: 'Pull request created successfully',
  })
  @Post()
  async createPullRequest(@Body() pullRequestDto: PullRequestDto) {
    this.logger.debug(`Creating pull request: ${pullRequestDto}`);
    return this.pullRequestService.createPullRequest(pullRequestDto, pullRequestDto.repositoryId);
  }

  @ApiOperation({
    summary: 'Update pull request',
    description: 'Updates an existing pull request with new data',
  })
  @ApiResponse({
    status: 200,
    description: 'Pull request updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Pull request not found' })
  @Put(':id')
  async updatePullRequest(@Param('id') id: string, @Body() pullRequestDto: PullRequestDto) {
    this.logger.debug(`Updating pull request: ${pullRequestDto}`);
    return this.pullRequestService.updatePullRequest(pullRequestDto);
  }

  @ApiOperation({
    summary: 'Delete pull request',
    description: 'Deletes a pull request by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Pull request deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Pull request not found' })
  @Delete(':id')
  async deletePullRequest(@Param('id') id: string) {
    this.logger.debug(`Deleting pull request: ${id}`);
    return this.pullRequestService.deletePullRequest(id);
  }
}
