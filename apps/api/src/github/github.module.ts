import { Module } from '@nestjs/common';
import { GithubWebhookController } from './webhook.controller';
import { GithubService } from './github.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RepositoryModule } from 'src/repository/repository.module';
@Module({
  imports: [PrismaModule, RepositoryModule],
  controllers: [GithubWebhookController],
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
