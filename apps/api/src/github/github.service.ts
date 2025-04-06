import { Injectable, Logger } from '@nestjs/common';
import { GithubWebhookDto } from './dto/webhook.github.dto';
import { RepositoryService } from 'src/repository/repository.service';
import { PullRequestService } from 'src/pull-request/pull-request.service';
import { UserService } from 'src/user/user.service';
import { RepositoryDto } from 'src/repository/dto/repository.dto';
import { PullRequestMapper } from 'src/pull-request/mapper/pull-request.mapper';
@Injectable()
export class GithubService {
  private readonly logger;
  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly pullRequestService: PullRequestService,
    private readonly pullRequestMapper: PullRequestMapper,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger(GithubService.name);
  }

  /**
   * Handles a webhook event when a pull request is opened
   * @param webhookDto - The webhook payload containing repository and pull request data
   * @returns {Promise<void>}
   */
  async handlePullRequestOpened(webhookDto: GithubWebhookDto) {
    this.logger.debug(`Webhook received: ${JSON.stringify(webhookDto)}`);
    try {
      const { user, repository, pullRequest } = await this.processGitHubWebhook(webhookDto);
    } catch (error) {
      this.logger.error(`Error handling pull request opened: ${error}`);
    }
  }

  /**
   * Handles a webhook event when a pull request is closed
   * @param webhookDto - The webhook payload containing repository and pull request data
   * @returns {Promise<void>}
   */
  async handlePullRequestClosed(webhookDto: GithubWebhookDto) {
    this.logger.debug(`Webhook received: ${JSON.stringify(webhookDto)}`);
    try {
      const { user, repository, pullRequest } = await this.processGitHubWebhook(webhookDto);
    } catch (error) {
      this.logger.error(`Error handling pull request closed: ${error}`);
    }
  }

  /**
   * Handles a webhook event when a pull request is synchronized (updated)
   * @param webhookDto - The webhook payload containing repository and pull request data
   * @returns {Promise<void>}
   */
  async handlePullRequestSynchronized(webhookDto: GithubWebhookDto) {
    this.logger.debug(`Webhook received: ${JSON.stringify(webhookDto)}`);

    try {
      const { user, repository, pullRequest } = await this.processGitHubWebhook(webhookDto);
    } catch (error) {
      this.logger.error(`Error handling pull request synchronized: ${error}`);
    }
  }

  /**
   * Processes a GitHub webhook event for pull requests
   * @param webhookDto - The webhook payload containing repository and pull request data
   * @returns {Promise<{user, repository, pullRequest}>} Returns the processed user, repository and pull request
   * @description
   * This method handles the processing of GitHub webhook events by:
   * 1. Extracting repository and pull request data from the webhook
   * 2. Finding or creating the associated user based on repository owner
   * 3. Finding or creating the repository record
   * 4. Finding or creating the pull request record
   * @private
   */
  private async processGitHubWebhook(webhookDto: GithubWebhookDto) {
    const { repository, pull_request } = webhookDto;

    const user = await this.userService.getUserByProviderId(repository.owner.id.toString());

    if (!user) {
      this.logger.error(`User not found for provider id: ${repository.owner.id}`);
      return null;
    }

    let existingRepository = await this.repositoryService.getRepositoryByGithubId(repository.id.toString());

    if (!existingRepository) {
      const repositoryDto: RepositoryDto = {
        name: repository.name,
        url: repository.url,
        language: repository.language,
        hasWiki: repository.has_wiki,
        githubId: repository.id.toString(),
      };
      existingRepository = await this.repositoryService.createRepository(repositoryDto, user.id);
    }

    let existingPullRequest = await this.pullRequestService.getPullRequestByGithubId(pull_request.id.toString());

    if (!existingPullRequest) {
      const pullRequestDto = await this.pullRequestMapper.fromGithubWebhookDto(webhookDto);
      existingPullRequest = await this.pullRequestService.createPullRequest(pullRequestDto, existingRepository.id);
    }

    return {
      user,
      repository: existingRepository,
      pullRequest: existingPullRequest,
    };
  }
}
