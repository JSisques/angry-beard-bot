import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TriggerWorkflowDto } from './dto/trigger-workflow.dto';
import axios from 'axios';

@Injectable()
export class WorkflowService {
  private readonly logger;
  private readonly workflowUrl;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(WorkflowService.name);
    this.workflowUrl = this.configService.get('WORKFLOW_URL');
  }

  async triggerWorkflow(triggerWorkflowDto: TriggerWorkflowDto) {
    this.logger.debug(`Triggering workflow: ${JSON.stringify(triggerWorkflowDto)}`);
    const response = await axios.post(this.workflowUrl, triggerWorkflowDto);
    return response.data;
  }
}
