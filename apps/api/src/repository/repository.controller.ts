import { Controller, Logger, Post, Body } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { RepositoryDto } from './dto/repository.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Repository')
@Controller('repository')
export class RepositoryController {
  private readonly logger;
  constructor(private readonly repositoryService: RepositoryService) {
    this.logger = new Logger(RepositoryController.name);
  }

  @ApiOperation({
    summary: 'Create new repository',
    description: 'Creates a new repository with the provided data and user ID',
  })
  @ApiResponse({
    status: 201,
    description: 'Repository created successfully',
  })
  @Post()
  async createRepository(@Body() repositoryDto: RepositoryDto, @Body() userId: string) {
    this.logger.debug(`Creating repository: ${JSON.stringify(repositoryDto)}`);
    return this.repositoryService.createRepository(repositoryDto, userId);
  }
}
