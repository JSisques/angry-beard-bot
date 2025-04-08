import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { GithubApiService } from './github-api.service';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from 'src/repository/repository.module';
import { PullRequestModule } from 'src/pull-request/pull-request.module';
import { UserModule } from 'src/user/user.module';
import { ReviewModule } from 'src/review/review.module';
import { WorkflowModule } from 'src/workflow/workflow.module';
import { PullRequestMapper } from 'src/pull-request/mapper/pull-request.mapper';

@Module({
  imports: [ConfigModule, RepositoryModule, PullRequestModule, UserModule, ReviewModule, WorkflowModule],
  controllers: [GithubController],
  providers: [GithubService, GithubApiService, PullRequestMapper],
  exports: [GithubService, GithubApiService],
})
export class GithubModule {}
