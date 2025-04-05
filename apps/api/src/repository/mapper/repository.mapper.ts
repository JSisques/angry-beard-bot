import { Injectable, Logger } from '@nestjs/common';
import { RepositoryDto } from '../dto/repository.dto';
import { GithubRepository } from 'src/github/dto/webhook.github.dto';

@Injectable()
export class RepositoryMapper {
  private readonly logger;

  constructor() {
    this.logger = new Logger(RepositoryMapper.name);
  }

  /**
     * 
     * @param githubRepository interface GithubRepository {
  id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GithubUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  language: string;
  default_branch: string;
}
     * @returns 
     */

  async fromGitHubRepositoryToRepositoryDto(githubRepository: GithubRepository): Promise<RepositoryDto> {
    return {
      id: githubRepository.id,
      name: githubRepository.name,
      url: githubRepository.html_url,
      language: githubRepository.language,
      githubId: githubRepository.id,
      botConfigId: null,
      ownerId: githubRepository.owner.id,
    };
  }
}
