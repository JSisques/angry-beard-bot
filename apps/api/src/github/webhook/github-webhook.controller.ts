import { Controller, Post, Body, Logger } from '@nestjs/common';
import { GithubWebhookDto } from './dto/webhook.github.dto';
import { RepositoryService } from 'src/repository/repository.service';
import { GithubWebhookService } from './github-webhook.service';

@Controller('github/webhook')
export class GithubWebhookController {
  private readonly logger;

  constructor(private readonly githubWebhookService: GithubWebhookService) {
    this.logger = new Logger(GithubWebhookController.name);
  }

  @Post()
  async webhook(@Body() body: GithubWebhookDto) {
    this.logger.debug(`Webhook received with action: ${body.action}`);

    switch (body.action) {
      case 'opened':
        this.logger.debug(`Pull request opened: ${body.pull_request.id}`);
        this.githubWebhookService.handlePullRequestOpened(body);
        break;
      case 'closed':
        this.logger.debug(`Pull request closed: ${body.pull_request.id}`);
        this.githubWebhookService.handlePullRequestClosed(body);
        break;
      case 'edited':
        this.logger.debug(`Repository edited: ${body.repository.id}`);
        break;
      case 'submitted':
        this.logger.debug(`Review submitted: ${body.repository.id}`);
        break;
      case 'synchronize':
        this.logger.debug(`Pull request synchronized: ${body.pull_request.id}`);
        this.githubWebhookService.handlePullRequestSynchronized(body);

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
