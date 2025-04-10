import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from 'src/review/review.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
@Module({
  imports: [ConfigModule, ReviewModule, SubscriptionModule],
  providers: [WorkflowService],
  controllers: [WorkflowController],
  exports: [WorkflowService],
})
export class WorkflowModule {}
