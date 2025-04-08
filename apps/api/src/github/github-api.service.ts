import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class GithubApiService {
  private readonly logger;
  private readonly appId: string;
  private readonly privateKey: string;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(GithubApiService.name);
    this.appId = this.configService.get<string>('GITHUB_APP_ID');
    this.privateKey = this.configService.get<string>('GITHUB_PRIVATE_KEY');
  }

  /**
   * Creates an Octokit instance authenticated as the GitHub App
   * @returns {Promise<Octokit>} Authenticated Octokit instance
   */
  private async getAuthenticatedOctokit() {
    throw new Error('Not implemented');
  }

  /**
   * Creates an Octokit instance authenticated as the GitHub App installation
   * @param {number} installationId - The GitHub App installation ID
   * @returns {Promise<Octokit>} Authenticated Octokit instance
   */
  async getInstallationOctokit(installationId: number) {
    try {
      throw new Error('Not implemented');
    } catch (error) {
      this.logger.error(`Error getting installation token: ${error.message}`);
      throw error;
    }
  }

  /**
   * Gets the installation details
   * @param {number} installationId - The GitHub App installation ID
   * @returns {Promise<any>} Installation details
   */
  async getInstallation(installationId: number) {
    try {
      return 1;
    } catch (error) {
      this.logger.error(`Error getting installation: ${error.message}`);
      throw error;
    }
  }
}
