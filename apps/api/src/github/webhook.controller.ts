import { Controller, Post, Body, Logger } from '@nestjs/common';
import { GithubWebhookDto } from './dto/webhook.github.dto';
import { RepositoryService } from 'src/repository/repository.service';
import { RepositoryMapper } from 'src/repository/mapper/repository.mapper';
@Controller('github/webhook')
export class GithubWebhookController {
  private readonly logger;

  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly repositoryMapper: RepositoryMapper,
  ) {
    this.logger = new Logger(GithubWebhookController.name);
  }

  @Post()
  async webhook(@Body() body: GithubWebhookDto) {
    this.logger.debug(`Webhook received with action: ${body.action}`);

    switch (body.action) {
      case 'opened':
        this.logger.debug(`Repository opened: ${body.repository.id}`);
        break;
      case 'closed':
        this.logger.debug(`Repository closed: ${body.repository.id}`);
        break;
      case 'edited':
        this.logger.debug(`Repository edited: ${body.repository.id}`);
        break;
      case 'submitted':
        this.logger.debug(`Review submitted: ${body.repository.id}`);
        break;
      case 'synchronize':
        this.logger.debug(`Pull request synchronized: ${body.pull_request.id}`);
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
