import { Controller, Post, Body, Logger } from '@nestjs/common';
import { GithubWebhookDto } from './dto/webhook.github.dto';

@Controller('github/webhook')
export class GithubWebhookController {
  private readonly logger;
  constructor() {
    this.logger = new Logger(GithubWebhookController.name);
  }
  @Post()
  async webhook(@Body() body: GithubWebhookDto) {
    this.logger.log(body);
    return {
      message: 'Webhook received',
    };
  }
}
