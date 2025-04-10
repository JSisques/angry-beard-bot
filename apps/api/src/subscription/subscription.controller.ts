import { Controller, Get, Post, Put, Delete, Param, Body, Logger } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscription } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
  private readonly logger;

  constructor(private readonly subscriptionService: SubscriptionService) {
    this.logger = new Logger(SubscriptionController.name);
  }

  @ApiOperation({ summary: 'Get subscription by ID' })
  @ApiParam({ name: 'id', description: 'Subscription ID' })
  @ApiResponse({ status: 200, description: 'Returns the subscription' })
  @Get(':id')
  async getSubscription(@Param('id') id: string): Promise<Subscription> {
    this.logger.log(`Getting subscription by ID: ${id}`);
    return this.subscriptionService.getSubscriptionById(id);
  }

  @ApiOperation({ summary: 'Get subscription by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Returns the user subscription' })
  @Get('user/:userId')
  async getSubscriptionByUserId(@Param('userId') userId: string): Promise<Subscription> {
    this.logger.log(`Getting subscription by user ID: ${userId}`);
    return this.subscriptionService.getSubscriptionByUserId(userId);
  }

  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiBody({ description: 'Subscription data' })
  @ApiResponse({ status: 201, description: 'Subscription created successfully' })
  @Post()
  async createSubscription(@Body() subscription: Subscription): Promise<Subscription> {
    this.logger.log(`Creating subscription: ${JSON.stringify(subscription)}`);
    return this.subscriptionService.createSubscription(subscription);
  }

  @ApiOperation({ summary: 'Update subscription by ID' })
  @ApiParam({ name: 'id', description: 'Subscription ID' })
  @ApiBody({ description: 'Updated subscription data' })
  @ApiResponse({ status: 200, description: 'Subscription updated successfully' })
  @Put(':id')
  async updateSubscription(@Param('id') id: string, @Body() subscription: Subscription): Promise<Subscription> {
    this.logger.log(`Updating subscription: ${id} with data: ${JSON.stringify(subscription)}`);
    return this.subscriptionService.updateSubscription(id, subscription);
  }

  @ApiOperation({ summary: 'Delete subscription by ID' })
  @ApiParam({ name: 'id', description: 'Subscription ID' })
  @ApiResponse({ status: 200, description: 'Subscription deleted successfully' })
  @Delete(':id')
  async deleteSubscription(@Param('id') id: string): Promise<Subscription> {
    this.logger.log(`Deleting subscription: ${id}`);
    return this.subscriptionService.deleteSubscription(id);
  }

  @ApiOperation({ summary: 'Mark subscription as expired' })
  @ApiParam({ name: 'id', description: 'Subscription ID' })
  @ApiResponse({ status: 200, description: 'Subscription marked as expired' })
  @Put('expire/:id')
  async expireSubscription(@Param('id') id: string): Promise<Subscription> {
    this.logger.log(`Marking subscription as expired: ${id}`);
    return this.subscriptionService.expireSubscription(id);
  }

  @ApiOperation({ summary: 'Activate subscription' })
  @ApiParam({ name: 'id', description: 'Subscription ID' })
  @ApiResponse({ status: 200, description: 'Subscription activated successfully' })
  @Put('activate/:id')
  async activateSubscription(@Param('id') id: string): Promise<Subscription> {
    this.logger.log(`Activating subscription: ${id}`);
    return this.subscriptionService.activateSubscription(id);
  }

  @ApiOperation({ summary: 'Cancel subscription' })
  @ApiParam({ name: 'id', description: 'Subscription ID' })
  @ApiResponse({ status: 200, description: 'Subscription cancelled successfully' })
  @Put('cancel/:id')
  async cancelSubscription(@Param('id') id: string): Promise<Subscription> {
    this.logger.log(`Cancelling subscription: ${id}`);
    return this.subscriptionService.cancelSubscription(id);
  }
}
