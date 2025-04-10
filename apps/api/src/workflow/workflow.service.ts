import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TriggerWorkflowDto } from './dto/trigger-workflow.dto';
import axios from 'axios';
import { WorkflowCallbackDto } from './dto/callback-workflow.dto';
import { ReviewService } from 'src/review/review.service';
import { SubscriptionDto } from 'src/subscription/dto/subscription.dto';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { WorkflowSource } from './enum/workflow-source.enum';
import { GithubApiService } from 'src/github/github-api.service';
@Injectable()
export class WorkflowService {
  private readonly logger;
  private readonly workflowUrl;

  constructor(
    private readonly configService: ConfigService,
    private readonly reviewService: ReviewService,
    private readonly subscriptionService: SubscriptionService,
    private readonly githubApiService: GithubApiService,
  ) {
    this.logger = new Logger(WorkflowService.name);
    this.workflowUrl = this.configService.get('WORKFLOW_URL');
  }

  /**
   * Checks if a workflow can proceed based on subscription status and credits
   * @param subscription - The subscription data to check
   * @param currentCredits - The current number of credits used
   * @returns {Promise<boolean>} True if the workflow can proceed, false otherwise
   */
  async canProceed(subscription: SubscriptionDto, currentCredits: number) {
    this.logger.log(`Checking subscription status for user: ${subscription.userId}`);

    let canProceed = true;

    const isActive = await this.subscriptionService.isSubscriptionActive(subscription.status);

    if (!isActive) {
      this.logger.log(`Subscription is not active for user: ${subscription.userId}`);
      canProceed = false;
    }

    if (currentCredits >= subscription.credits) {
      this.logger.log(`User has reached the maximum number of credits for user: ${subscription.userId}`);
      canProceed = false;
    }

    return canProceed;
  }

  /**
   * Triggers a workflow with the provided data
   * @param triggerWorkflowDto - The data needed to trigger the workflow
   * @returns {Promise<any>} The workflow response data
   */
  async triggerWorkflow(triggerWorkflowDto: TriggerWorkflowDto) {
    this.logger.debug(`Triggering workflow: ${JSON.stringify(triggerWorkflowDto)}`);
    const response = await axios.post(this.workflowUrl, triggerWorkflowDto);
    return response.data;
  }

  /**
   * Handles the callback from a workflow execution
   * @param body - The workflow callback data
   * @returns {Promise<{review: any}>} Object containing the created review
   */
  async handleWorkflowCallback(body: WorkflowCallbackDto) {
    this.logger.debug(`Handling workflow callback: ${JSON.stringify(body)}`);

    if (body.source === WorkflowSource.GITHUB) {
      this.logger.debug('Handling Github workflow callback');
      await this.githubApiService.postCommentReview(body);
    }

    const review = await this.reviewService.createReview({
      userId: body.userId,
      pullRequestId: body.pullRequestId,
      comment: body.output,
      filename: body.filename,
      patch: body.patch,
    });

    return { review };
  }
}
