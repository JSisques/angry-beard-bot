import { Controller, Logger, Post, Body } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { RepositoryDto } from './dto/repository.dto';

@Controller('repository')
export class RepositoryController {
  private readonly logger;
  constructor(private readonly repositoryService: RepositoryService) {
    this.logger = new Logger(RepositoryController.name);
  }

  @Post()
  async createRepository(@Body() repositoryDto: RepositoryDto) {
    return this.repositoryService.createRepository(repositoryDto);
  }
}
