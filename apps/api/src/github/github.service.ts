import { Injectable, Logger } from '@nestjs/common';
import { GithubWebhookDto } from './dto/webhook.github.dto';
import { PullRequestMapper } from 'src/pull-request/mapper/pull-request.mapper';
import { PullRequestService } from 'src/pull-request/pull-request.service';
import { RepositoryService } from 'src/repository/repository.service';
import { ReviewService } from 'src/review/review.service';
import { UserService } from 'src/user/user.service';
import { WorkflowService } from 'src/workflow/workflow.service';
import { RepositoryDto } from 'src/repository/dto/repository.dto';
import { GithubApiService } from './github-api.service';
import { PullRequestFileDto } from './dto/github-pull-request-file.dto';
import { WorkflowMetadata } from 'src/workflow/interface/workflow-metadata.interface';
import { TriggerWorkflowDto } from 'src/workflow/dto/trigger-workflow.dto';
import { GithubMapper } from './mapper/github.mapper';
import { BotConfigService } from 'src/bot-config/bot-config.service';
@Injectable()
export class GithubService {
  private readonly logger;

  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly pullRequestService: PullRequestService,
    private readonly pullRequestMapper: PullRequestMapper,
    private readonly userService: UserService,
    private readonly workflowService: WorkflowService,
    private readonly githubApiService: GithubApiService,
    private readonly githubMapper: GithubMapper,
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
      await this.processGitHubWebhook(webhookDto);
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
      await this.processGitHubWebhook(webhookDto);
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
      await this.processGitHubWebhook(webhookDto);
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
  private async preProcessGitHubWebhook(webhookDto: GithubWebhookDto) {
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
      installation: webhookDto.installation,
      botConfig: user.botConfig,
    };
  }

  /**
   * Processes a GitHub webhook event by:
   * 1. Pre-processing the webhook data to get or create necessary records
   * 2. Triggering the associated workflow
   * 3. Returns the processed entities
   * @param webhookDto The GitHub webhook payload
   * @returns Object containing the processed user, repository, pull request and review
   */
  async processGitHubWebhook(webhookDto: GithubWebhookDto) {
    this.logger.debug(`Processing GitHub webhook: ${JSON.stringify(webhookDto)}`);
    try {
      const { user, repository, pullRequest, installation, botConfig } = await this.preProcessGitHubWebhook(webhookDto);

      const installationToken = await this.githubApiService.getInstallationToken(installation.id);

      const { pullRequestFiles, commitSha } = await this.githubApiService.getFilesFromLastCommitOfPullRequest(
        installationToken,
        webhookDto.repository.owner.login,
        webhookDto.repository.name,
        webhookDto.pull_request.number,
        botConfig.ignoredExtensions,
      );
      this.logger.debug(`Pull request files: ${JSON.stringify(pullRequestFiles)}`);

      const payload = this.githubMapper.toPullRequestWorkflowPayload(user.id, pullRequestFiles, pullRequest, botConfig, installation.id, commitSha);
      this.logger.debug(`Payload: ${JSON.stringify(payload)}`);

      if (payload.workflowData.pullRequestFiles.length === 0) {
        this.logger.debug(`No files to process, skipping workflow`);
        return { user, repository, pullRequest, workflowResponse: null };
      }

      const canProceed = await this.workflowService.canProceed(user.subscription, user._count.reviews);
      this.logger.debug(`Can proceed: ${canProceed}`);

      if (!canProceed) {
        this.logger.debug(`User has reached the maximum number of credits, skipping workflow`);
        return { user, repository, pullRequest, workflowResponse: null };
      }

      const workflowResponse = await this.workflowService.triggerWorkflow(payload);
      this.logger.debug(`Workflow response: ${JSON.stringify(workflowResponse)}`);

      return { user, repository, pullRequest, workflowResponse };
    } catch (error) {
      this.logger.error(`Error processing GitHub webhook: ${error}`);
      throw error;
    }
  }
}
