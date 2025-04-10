import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Subscription } from '@prisma/client';
import { SubscriptionCredits } from './enum/credits.enum';
import { SubscriptionPlan } from './enum/plans.enum';
import { SubscriptionStatus } from './enum/status.enum';
@Injectable()
export class SubscriptionService {
  private readonly logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(SubscriptionService.name);
  }

  /**
   * Retrieves a subscription by its ID
   * @param id - The unique identifier of the subscription
   * @returns {Promise<Subscription | null>} The subscription if found, null otherwise
   */
  async getSubscriptionById(id: string) {
    this.logger.log(`Getting subscription by ID: ${id}`);
    return this.prisma.subscription.findUnique({ where: { id } });
  }

  /**
   * Gets a subscription by user ID
   * @param userId - The unique identifier of the user
   * @returns {Promise<Subscription | null>} The subscription if found, null otherwise
   */
  async getSubscriptionByUserId(userId: string) {
    this.logger.log(`Getting subscription by user ID: ${userId}`);
    return this.prisma.subscription.findUnique({ where: { userId } });
  }

  /**
   * Creates a new subscription
   * @param subscription - The subscription data to create
   * @returns {Promise<Subscription>} The created subscription
   */
  async createSubscription(subscription: Subscription) {
    this.logger.log(`Creating subscription: ${JSON.stringify(subscription)}`);
    return this.prisma.subscription.create({ data: subscription });
  }

  /**
   * Updates an existing subscription
   * @param id - The unique identifier of the subscription to update
   * @param subscription - The updated subscription data
   * @returns {Promise<Subscription>} The updated subscription
   */
  async updateSubscription(id: string, subscription: Subscription) {
    this.logger.log(`Updating subscription: ${id} with data: ${JSON.stringify(subscription)}`);
    return this.prisma.subscription.update({ where: { id }, data: subscription });
  }

  /**
   * Updates a subscription to a free plan
   * @param id - The unique identifier of the subscription to update
   * @returns {Promise<Subscription>} The updated subscription
   */
  async updateSubscriptionToFree(id: string) {
    this.logger.log(`Updating subscription: ${id} to free plan`);
    return this.prisma.subscription.update({
      where: { id },
      data: {
        plan: SubscriptionPlan.FREE,
        credits: SubscriptionCredits.FREE,
      },
    });
  }

  /**
   * Updates a subscription to a paid plan
   * @param id - The unique identifier of the subscription to update
   * @returns {Promise<Subscription>} The updated subscription
   */
  async updateSubscriptionToPro(id: string) {
    this.logger.log(`Updating subscription: ${id} to pro plan`);
    return this.prisma.subscription.update({
      where: { id },
      data: {
        plan: SubscriptionPlan.PRO,
        credits: SubscriptionCredits.PRO,
      },
    });
  }

  /**
   * Updates a subscription to an enterprise plan
   * @param id - The unique identifier of the subscription to update
   * @returns {Promise<Subscription>} The updated subscription
   */
  async updateSubscriptionToEnterprise(id: string) {
    this.logger.log(`Updating subscription: ${id} to enterprise plan`);
    return this.prisma.subscription.update({
      where: { id },
      data: {
        plan: SubscriptionPlan.ENTERPRISE,
        credits: SubscriptionCredits.ENTERPRISE,
      },
    });
  }

  /**
   * Deletes a subscription by its ID
   * @param id - The unique identifier of the subscription to delete
   * @returns {Promise<Subscription>} The deleted subscription
   */
  async deleteSubscription(id: string) {
    this.logger.log(`Deleting subscription: ${id}`);
    return this.prisma.subscription.delete({ where: { id } });
  }

  /**
   * Marks a subscription as expired
   * @param id - The unique identifier of the subscription to expire
   * @returns {Promise<Subscription>} The updated subscription with expired status
   */
  async expireSubscription(id: string) {
    this.logger.log(`Expiring subscription: ${id}`);
    return this.prisma.subscription.update({
      where: { id },
      data: { status: SubscriptionStatus.EXPIRED },
    });
  }

  /**
   * Activates a subscription
   * @param id - The unique identifier of the subscription to activate
   * @returns {Promise<Subscription>} The updated subscription with active status
   */
  async activateSubscription(id: string) {
    this.logger.log(`Activating subscription: ${id}`);
    return this.prisma.subscription.update({
      where: { id },
      data: { status: SubscriptionStatus.ACTIVE },
    });
  }

  /**
   * Cancels a subscription
   * @param id - The unique identifier of the subscription to cancel
   * @returns {Promise<Subscription>} The updated subscription with canceled status
   */
  async cancelSubscription(id: string) {
    this.logger.log(`Cancelling subscription: ${id}`);
    return this.prisma.subscription.update({
      where: { id },
      data: { status: SubscriptionStatus.CANCELED },
    });
  }
}
