import { Controller, Logger, Post, Body } from '@nestjs/common';
import { GithubWebhookDto } from './dto/webhook.github.dto';
import { GithubService } from './github.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('GitHub')
@Controller('github')
export class GithubController {
  private readonly logger;

  constructor(private readonly githubService: GithubService) {
    this.logger = new Logger(GithubController.name);
  }

  @ApiOperation({
    summary: 'Handle GitHub webhook events',
    description: 'Processes incoming GitHub webhook events for pull request and repository actions',
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook processed successfully',
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Webhook received',
        },
      },
    },
  })
  @Post('/webhook')
  async webhook(@Body() body: GithubWebhookDto) {
    this.logger.debug(`Webhook received with action: ${body.action}`);

    switch (body.action) {
      case 'opened':
        this.logger.debug(`Pull request opened: ${body.pull_request.id}`);
        this.githubService.handlePullRequestOpened(body);
        break;
      case 'closed':
        this.logger.debug(`Pull request closed: ${body.pull_request.id}`);
        this.githubService.handlePullRequestClosed(body);
        break;
      case 'edited':
        this.logger.debug(`Repository edited: ${body.repository.id}`);
        break;
      case 'submitted':
        this.logger.debug(`Review submitted for pull request: ${body.pull_request.id}`);
        break;
      case 'synchronize':
        this.logger.debug(`Pull request synchronized: ${body.pull_request.id}`);
        this.githubService.handlePullRequestSynchronized(body);
        break;
      case 'created':
        this.logger.debug(`Review created for repository: ${body.repository.id}`);
        break;
      default:
        this.logger.debug(`Unknown action: ${body.action}`);
        break;
    }

    return {
      message: 'Webhook received',
    };
  }
}
