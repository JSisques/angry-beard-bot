import { Controller, Post, Body, Logger } from '@nestjs/common';
import { GithubWebhookDto } from './dto/webhook.github.dto';
import { RepositoryService } from 'src/repository/repository.service';
import { RepositoryMapper } from 'src/repository/mapper/repository.mapper';
@Controller('github/webhook')
export class GithubWebhookController {
  private readonly logger;

  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly repositoryMapper: RepositoryMapper,
  ) {
    this.logger = new Logger(GithubWebhookController.name);
  }

  @Post()
  async webhook(@Body() body: GithubWebhookDto) {
    this.logger.debug(`Webhook received: ${JSON.stringify(body)}`);

    const repositoryExists = await this.repositoryService.getRepositoryByGithubId(body.repository.id);

    if (!repositoryExists) {
      this.logger.debug(`Repository ${body.repository.id} not found, creating`);
      const repositoryDto = await this.repositoryMapper.fromGitHubRepositoryToRepositoryDto(body.repository);
      const repository = await this.repositoryService.createRepository(repositoryDto);
    }
  }
}
