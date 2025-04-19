import { IsString, IsEnum, IsInt, IsOptional, IsDate } from 'class-validator';
import { SubscriptionPlan } from '../enum/plans.enum';
import { SubscriptionStatus } from '../enum/status.enum';

export class SubscriptionDto {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsEnum(SubscriptionPlan)
  plan: SubscriptionPlan;

  @IsEnum(SubscriptionStatus)
  status: SubscriptionStatus;

  @IsInt()
  credits: number;

  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
