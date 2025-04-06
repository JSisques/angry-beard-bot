import { Injectable, Logger } from '@nestjs/common';
import { CreatePullRequestDto } from '../dto/create-pull-request.dto';
import { GithubWebhookDto } from 'src/github/dto/webhook.github.dto';
@Injectable()
export class PullRequestMapper {
  private readonly logger;
  constructor() {
    this.logger = new Logger(PullRequestMapper.name);
  }

  async fromGithubWebhookDto(webhookDto: GithubWebhookDto): Promise<CreatePullRequestDto> {
    this.logger.debug(`Mapping pull request from github webhook dto: ${webhookDto}`);
    return {
      title: webhookDto.pull_request.title.toString(),
      body: webhookDto.pull_request.body?.toString(),
      url: webhookDto.pull_request.html_url?.toString(),
      htmlUrl: webhookDto.pull_request.html_url?.toString(),
      diffUrl: webhookDto.pull_request.diff_url?.toString(),
      patchUrl: webhookDto.pull_request.patch_url?.toString(),
      issueUrl: webhookDto.pull_request.issue_url?.toString(),
      commitsUrl: webhookDto.pull_request.commits_url?.toString(),
      reviewCommentsUrl: webhookDto.pull_request.review_comments_url?.toString(),
      commentsUrl: webhookDto.pull_request.comments_url?.toString(),
      statusesUrl: webhookDto.pull_request.statuses_url?.toString(),
      githubId: webhookDto.pull_request.id.toString(),
      number: webhookDto.pull_request.number,
      state: webhookDto.pull_request.state.toString(),
      commits: webhookDto.pull_request.commits,
      additions: webhookDto.pull_request.additions,
      deletions: webhookDto.pull_request.deletions,
      changedFiles: webhookDto.pull_request.changed_files,
      isMerged: webhookDto.pull_request.merged ?? false,
      isMergeable: webhookDto.pull_request.mergeable ?? false,
      isRebaseable: webhookDto.pull_request.rebaseable ?? false,
      isDraft: webhookDto.pull_request.draft ?? false,
      mergedAt: webhookDto.pull_request.merged_at ? new Date(webhookDto.pull_request.merged_at) : null,
    };
  }
}
