import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { PullRequestFileDto, NormalizedPatchDto } from './dto/github-pull-request-file.dto';
import { WorkflowCallbackDto } from 'src/workflow/dto/callback-workflow.dto';
import { GithubCommit } from './dto/github-commit.dto';
@Injectable()
export class GithubApiService {
  private readonly logger;
  private readonly appId: string;
  private readonly privateKey: string;
  private token: string;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(GithubApiService.name);
    this.appId = this.configService.get<string>('GITHUB_APP_ID');
    this.privateKey = this.configService.get<string>('GITHUB_PRIVATE_KEY');
  }

  /**
   * Generates a JWT token for GitHub App authentication
   * @returns JWT token string
   * @private
   */
  private generateJwt(): string {
    this.logger.debug(`Generating JWT token for GitHub App ID: ${this.appId}`);

    const now = Math.floor(Date.now() / 1000);

    return jwt.sign(
      {
        iat: now,
        exp: now + 600, // 10 minutos
        iss: this.appId,
      },
      this.privateKey,
      { algorithm: 'RS256' },
    );
  }

  /**
   * Gets an installation access token for a specific GitHub App installation
   * @param installationId - The ID of the GitHub App installation
   * @returns Promise resolving to the installation access token
   */
  async getInstallationToken(installationId: number): Promise<string> {
    this.logger.debug(`Getting installation token for installation ID: ${installationId}`);
    const jwtToken = this.generateJwt();

    const response = await axios.post(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          Accept: 'application/vnd.github+json',
        },
      },
    );

    this.token = response.data.token;

    return response.data.token;
  }

  /**
   * Retrieves the list of files modified in a pull request
   * @param token - GitHub access token
   * @param owner - Repository owner
   * @param repo - Repository name
   * @param prNumber - Pull request number
   * @returns Promise resolving to an array of modified files with their details
   */
  async getPullRequestFiles(token: string, owner: string, repo: string, prNumber: number): Promise<PullRequestFileDto[]> {
    this.logger.debug(`Getting pull request files for owner: ${owner}, repo: ${repo}, prNumber: ${prNumber}`);
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const normalizedFiles = await Promise.all(
      response.data.map(async (file: PullRequestFileDto) => {
        const normalizedPatch = await this.normalizeDiffPatch(file.patch);
        return { ...file, normalizedPatch };
      }),
    );

    return normalizedFiles;
  }

  /**
   * Retrieves the files changed in the last commit of a pull request
   * @param token - GitHub access token
   * @param owner - Repository owner
   * @param repo - Repository name
   * @param prNumber - Pull request number
   * @returns Promise resolving to an array of modified files with their details
   * @throws Error if unable to fetch commits or commit details
   */
  async getFilesFromLastCommitOfPullRequest(
    token: string,
    owner: string,
    repo: string,
    prNumber: number,
    ignoredExtensions: string[],
  ): Promise<PullRequestFileDto[]> {
    this.logger.debug(`Getting files from last commit of pull request ${prNumber} for owner: ${owner}, repo: ${repo}`);

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    };

    const pullRequestCommits = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/commits`, {
      headers,
    });

    if (pullRequestCommits.status !== 200) {
      throw new Error('Error getting pull request commits');
    }

    const commits: GithubCommit[] = pullRequestCommits.data;
    this.logger.debug(`Pull request commits: ${JSON.stringify(commits)}`);

    const orderedCommits = commits.sort((a, b) => new Date(a.commit.committer.date).getTime() - new Date(b.commit.committer.date).getTime());
    this.logger.debug(`Ordered commits: ${JSON.stringify(orderedCommits)}`);

    const lastCommitSha = orderedCommits.pop()?.sha;
    this.logger.debug(`Last commit SHA: ${lastCommitSha}`);

    if (!lastCommitSha) throw new Error('No se encontró el último commit de la PR');

    const commitDetails = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits/${lastCommitSha}`, { headers });

    if (commitDetails.status !== 200) {
      throw new Error('Error getting commit details');
    }

    const files = commitDetails.data.files;
    this.logger.debug(`Commit details files: ${JSON.stringify(files)}`);

    const filteredFiles = files.filter(file => !ignoredExtensions.includes(file.filename.split('.').pop()));
    this.logger.debug(`Filtered files: ${JSON.stringify(filteredFiles)}`);

    const normalizedFiles = await Promise.all(
      filteredFiles.map(async (file: PullRequestFileDto) => {
        const normalizedPatch = await this.normalizeDiffPatch(file.patch);
        return { ...file, normalizedPatch };
      }),
    );

    return normalizedFiles;
  }

  /**
   * Normalizes a git diff patch into a structured format
   * @param patch - The raw git diff patch string
   * @returns Promise resolving to an array of normalized patch lines with line numbers and content
   */
  private async normalizeDiffPatch(patch: string): Promise<NormalizedPatchDto> {
    if (!patch)
      return {
        startLine: 0,
        endLine: 0,
        content: '',
      };

    const lines = patch.split('\n');
    const headerLine = lines.find(line => line.startsWith('@@'));

    if (!headerLine) {
      throw new Error('No se encontró un encabezado de cambio en el patch');
    }

    const match = headerLine.match(/@@ -(\d+),\d+ \+(\d+),(\d+) @@/);

    if (!match) {
      throw new Error('No se pudo extraer la información de las líneas del patch');
    }

    const startLine = parseInt(match[2], 10);
    const numLines = parseInt(match[3], 10);
    const endLine = startLine + numLines - 1;

    const content = lines.slice(lines.indexOf(headerLine) + 1, lines.indexOf(headerLine) + 1 + numLines);

    return {
      startLine,
      endLine,
      content: content.join('\n'),
    };
  }

  async postCommentReview(body: WorkflowCallbackDto) {
    this.logger.debug(`Posting comment review for pull request ${body.pullRequestId}`);

    const token = await this.getInstallationToken(body.installationId);
    this.logger.debug(`Token: ${token}`);

    const urlParts = body.pullRequestUrl.split('/');
    const owner = urlParts[urlParts.length - 4];
    const repo = urlParts[urlParts.length - 3];
    const prNumber = urlParts[urlParts.length - 1];

    this.logger.debug(`Extracted owner: ${owner}, repo: ${repo}, prNumber: ${prNumber}`);

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/comments`;
    this.logger.debug(`Using API URL: ${apiUrl}`);

    const payload = {
      body: body.output.toString().trim(),
      commit_id: body.commitSha.toString().trim(),
      path: body.filename.toString().trim(),
      position: body.startLine,
    };

    this.logger.debug(`Payload: ${JSON.stringify(payload)}`);

    const response = await axios.post(apiUrl, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    this.logger.debug(`Comment review posted for pull request ${body.pullRequestId}`);
    return response.data;
  }
}
