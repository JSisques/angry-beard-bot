import { PullRequestFileDto } from 'src/github/dto/github-pull-request-file.dto';
import { PullRequestDto } from 'src/pull-request/dto/pull-request.dto';
import { RepositoryDto } from 'src/repository/dto/repository.dto';

export class TriggerWorkflowDto {
  repository?: RepositoryDto;
  pullRequest?: PullRequestDto;
  pullRequestFiles?: PullRequestFileDto[];
}
