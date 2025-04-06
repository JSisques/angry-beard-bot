import { Injectable, Logger } from '@nestjs/common';
import { RepositoryDto } from '../dto/repository.dto';
import { GithubRepository } from 'src/github/dto/webhook.github.dto';

@Injectable()
export class RepositoryMapper {
  private readonly logger;

  constructor() {
    this.logger = new Logger(RepositoryMapper.name);
  }
  async fromGitHubRepositoryToRepositoryDto(githubRepository: GithubRepository): Promise<RepositoryDto> {
    return {
      name: githubRepository.name,
      url: githubRepository.html_url,
      language: githubRepository.language?.toLowerCase(),
      githubId: githubRepository.id.toString(),
      botConfigId: null,
      ownerId: githubRepository.owner.id.toString(),
    };
  }
}
