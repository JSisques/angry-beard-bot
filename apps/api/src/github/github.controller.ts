import { Controller, Logger, Post, Body } from '@nestjs/common';
import { GithubWebhookDto } from './dto/webhook.github.dto';
import { GithubService } from './github.service';
@Controller('github')
export class GithubController {
  private readonly logger;

  constructor(private readonly githubService: GithubService) {
    this.logger = new Logger(GithubController.name);
  }

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
        this.logger.debug(`Review submitted: ${body.repository.id}`);
        break;
      case 'synchronize':
        this.logger.debug(`Pull request synchronized: ${body.pull_request.id}`);
        this.githubService.handlePullRequestSynchronized(body);

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
