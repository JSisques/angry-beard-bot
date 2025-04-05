import { Module } from '@nestjs/common';
import { GithubWebhookController } from './webhook.controller';
import { GithubService } from './github.service';

@Module({
  controllers: [GithubWebhookController],
  providers: [GithubService],
})
export class GithubModule {}
