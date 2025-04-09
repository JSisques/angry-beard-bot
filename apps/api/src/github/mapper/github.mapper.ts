import { Injectable, Logger } from '@nestjs/common';
import { GithubWebhookDto } from '../dto/webhook.github.dto';
import { TriggerWorkflowDto } from 'src/workflow/dto/trigger-workflow.dto';
import { v4 as uuidv4 } from 'uuid';
import { WorkflowMetadata } from 'src/workflow/interface/workflow-metadata.interface';
import { PullRequestFileDto } from '../dto/github-pull-request-file.dto';
import { PullRequestDto } from 'src/pull-request/dto/pull-request.dto';
import { BotConfigDto } from 'src/bot-config/dto/bot-config.dto';
@Injectable()
export class GithubMapper {
  private readonly logger;

  constructor() {
    this.logger = new Logger(GithubMapper.name);
  }

  private toWorkflowMetadata(): WorkflowMetadata {
    return {
      requestId: uuidv4(),
    };
  }

  toPullRequestWorkflowPayload(
    userId: string,
    files: PullRequestFileDto[],
    pullRequest: PullRequestDto,
    botConfig: BotConfigDto,
  ): TriggerWorkflowDto {
    files.map(file => {
      file.pullRequestNumber = pullRequest.number;
      file.pullRequestUrl = pullRequest.url;
    });

    return {
      workflowMetadata: this.toWorkflowMetadata(),
      workflowData: {
        userId,
        pullRequestId: pullRequest.id,
        pullRequestFiles: files,
        botConfig,
      },
    };
  }
}
