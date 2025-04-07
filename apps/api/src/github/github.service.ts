import { Injectable, Logger } from '@nestjs/common';
import { GithubWebhookDto } from './webhook/dto/webhook.github.dto';
import { RepositoryService } from 'src/repository/repository.service';
import { PullRequestService } from 'src/pull-request/pull-request.service';
import { UserService } from 'src/user/user.service';
import { RepositoryDto } from 'src/repository/dto/repository.dto';
import { PullRequestMapper } from 'src/pull-request/mapper/pull-request.mapper';
import { ReviewService } from 'src/review/review.service';
import { WorkflowService } from 'src/workflow/workflow.service';
import { Octokit } from '@octokit/rest';
import { ConfigService } from '@nestjs/config';
import { createAppAuth } from '@octokit/auth-app';

@Injectable()
export class GithubService {
  private readonly logger;
  private readonly octokit: Octokit;
  private readonly appId: string;
  private readonly privateKey: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(GithubService.name);
    this.appId = this.configService.get<string>('GITHUB_APP_ID');
    this.privateKey = this.configService.get<string>('GITHUB_PRIVATE_KEY');
    this.clientId = this.configService.get<string>('GITHUB_CLIENT_ID');
    this.clientSecret = this.configService.get<string>('GITHUB_CLIENT_SECRET');

    this.octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: this.appId,
        privateKey: this.privateKey,
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
    });
  }

  async getInstallation(installationId: number) {
    try {
      const response = await this.octokit.auth({
        type: 'installation',
        installationId,
      });

      console.log(response);
      // const token = response.token;

      // const installationOctokit = new Octokit({
      //   auth: token,
      // });

      // const installation = await installationOctokit.rest.apps.getInstallation({
      //   installation_id: installationId,
      // });

      // return installation;
    } catch (error) {
      this.logger.error(`Error getting installation: ${error.message}`);
      throw error;
    }
  }

  async getPullRequestChanges() {
    this.logger.debug('Getting pull request changes');
  }
}
