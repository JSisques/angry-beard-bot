import { Module } from '@nestjs/common';
import { PullRequestService } from './pull-request.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PullRequestController } from './pull-request.controller';
import { PullRequestMapper } from './mapper/pull-request.mapper';
@Module({
  imports: [PrismaModule],
  providers: [PullRequestService, PullRequestMapper],
  exports: [PullRequestService, PullRequestMapper],
  controllers: [PullRequestController],
})
export class PullRequestModule {}
