import { SubscriptionStatus as PrismaSubscriptionStatus } from '@prisma/client';

export const SubscriptionStatus = {
  ACTIVE: PrismaSubscriptionStatus.ACTIVE,
  CANCELED: PrismaSubscriptionStatus.CANCELED,
  EXPIRED: PrismaSubscriptionStatus.EXPIRED,
} as const;

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
