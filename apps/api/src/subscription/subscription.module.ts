import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { UserService } from '../user/user.service';
import { ReviewService } from '../review/review.service';
@Module({
  imports: [PrismaModule],
  providers: [SubscriptionService, UserService, ReviewService],
  exports: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
