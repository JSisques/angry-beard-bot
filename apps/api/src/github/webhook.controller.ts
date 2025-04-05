import { Controller, Post, Body, Logger } from '@nestjs/common';

@Controller('github/webhook')
export class GithubWebhookController {
  private readonly logger;
  constructor() {
    this.logger = new Logger(GithubWebhookController.name);
  }
  @Post()
  async webhook(@Body() body: any) {
    this.logger.log(body);
  }
}
