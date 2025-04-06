import { Module } from '@nestjs/common';
import { GithubWebhookController } from './github.controller';
import { GithubService } from './github.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { PullRequestModule } from 'src/pull-request/pull-request.module';
import { UserModule } from 'src/user/user.module';
import { PullRequestMapper } from 'src/pull-request/mapper/pull-request.mapper';
@Module({
  imports: [RepositoryModule, PullRequestModule, UserModule],
  controllers: [GithubWebhookController],
  providers: [GithubService, PullRequestMapper],
  exports: [GithubService],
})
export class GithubModule {}
