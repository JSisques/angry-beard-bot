import { Controller, Logger, Post, Body } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowCallbackDto } from './dto/callback-workflow.dto';

@Controller('workflow')
export class WorkflowController {
  private readonly logger;

  constructor(private readonly workflowService: WorkflowService) {
    this.logger = new Logger(WorkflowController.name);
  }

  @Post('/callback')
  async callback(@Body() body: WorkflowCallbackDto) {
    this.logger.debug(`Workflow callback received: ${JSON.stringify(body)}`);
    return this.workflowService.handleWorkflowCallback(body);
  }
}
