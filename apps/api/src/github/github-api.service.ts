import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { PullRequestFileDto, NormalizedPatchDto } from './dto/github-pull-request-file.dto';
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

    // Buscar la línea que contiene la información de las líneas afectadas.
    const headerLine = lines.find(line => line.startsWith('@@'));

    if (!headerLine) {
      throw new Error('No se encontró un encabezado de cambio en el patch');
    }

    // Extraer las líneas de inicio y fin del header.
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
}
