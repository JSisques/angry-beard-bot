import { Module } from '@nestjs/common';
import { PullRequestService } from './pull-request.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PullRequestController } from './pull-request.controller';
@Module({
  imports: [PrismaModule],
  providers: [PullRequestService],
  exports: [PullRequestService],
  controllers: [PullRequestController],
})
export class PullRequestModule {}
