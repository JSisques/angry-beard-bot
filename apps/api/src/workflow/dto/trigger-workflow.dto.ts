import { PullRequestFileDto } from 'src/github/dto/github-pull-request-file.dto';
import { PullRequestDto } from 'src/pull-request/dto/pull-request.dto';

export class TriggerWorkflowDto {
  pullRequest?: PullRequestDto;
  pullRequestFiles?: PullRequestFileDto[];
}
