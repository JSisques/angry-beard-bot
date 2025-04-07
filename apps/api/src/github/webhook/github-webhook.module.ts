import { Module } from '@nestjs/common';
import { GithubWebhookService } from './github-webhook.service';
import { ConfigModule } from '@nestjs/config';
import { GithubService } from '../github.service';
import { GithubModule } from '../github.module';

@Module({
  imports: [GithubModule],
  providers: [GithubWebhookService],
  exports: [GithubWebhookService],
})
export class GithubWebhookModule {}
