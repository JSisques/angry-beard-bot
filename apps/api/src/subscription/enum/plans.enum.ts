import { SubscriptionPlan as PrismaSubscriptionPlan } from '@prisma/client';

export const SubscriptionPlan = {
  FREE: PrismaSubscriptionPlan.FREE,
  PRO: PrismaSubscriptionPlan.PRO,
  ENTERPRISE: PrismaSubscriptionPlan.ENTERPRISE,
} as const;

export type SubscriptionPlan = (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan];
