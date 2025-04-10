import { Controller, Logger, Post, Body } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowCallbackDto } from './dto/callback-workflow.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Workflow')
@Controller('workflow')
export class WorkflowController {
  private readonly logger;

  constructor(private readonly workflowService: WorkflowService) {
    this.logger = new Logger(WorkflowController.name);
  }

  @ApiOperation({
    summary: 'Handle workflow callback',
    description: 'Receives and processes a callback from the workflow service with review results',
  })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created',
    schema: {
      properties: {
        review: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            pullRequestId: { type: 'string' },
            comment: { type: 'string' },
            filename: { type: 'string' },
            patch: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('/review/callback')
  async callback(@Body() body: WorkflowCallbackDto) {
    this.logger.debug(`Workflow callback received: ${JSON.stringify(body)}`);
    return this.workflowService.handleWorkflowCallback(body);
  }
}
