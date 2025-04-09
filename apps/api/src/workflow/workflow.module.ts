import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from 'src/review/review.module';
@Module({
  imports: [ConfigModule, ReviewModule],
  providers: [WorkflowService],
  controllers: [WorkflowController],
  exports: [WorkflowService],
})
export class WorkflowModule {}
