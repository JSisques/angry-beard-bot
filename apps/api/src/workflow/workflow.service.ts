import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TriggerWorkflowDto } from './dto/trigger-workflow.dto';
import axios from 'axios';
import { WorkflowCallbackDto } from './dto/callback-workflow.dto';
import { ReviewService } from 'src/review/review.service';
@Injectable()
export class WorkflowService {
  private readonly logger;
  private readonly workflowUrl;

  constructor(
    private readonly configService: ConfigService,
    private readonly reviewService: ReviewService,
  ) {
    this.logger = new Logger(WorkflowService.name);
    this.workflowUrl = this.configService.get('WORKFLOW_URL');
  }

  async triggerWorkflow(triggerWorkflowDto: TriggerWorkflowDto) {
    this.logger.debug(`Triggering workflow: ${JSON.stringify(triggerWorkflowDto)}`);
    const response = await axios.post(this.workflowUrl, triggerWorkflowDto);
    return response.data;
  }

  async handleWorkflowCallback(body: WorkflowCallbackDto) {
    this.logger.debug(`Handling workflow callback: ${JSON.stringify(body)}`);

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
