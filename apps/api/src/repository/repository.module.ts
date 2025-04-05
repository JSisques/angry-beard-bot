import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RepositoryMapper } from './mapper/repository.mapper';

@Module({
  imports: [PrismaModule],
  providers: [RepositoryService, RepositoryMapper],
  exports: [RepositoryService, RepositoryMapper],
})
export class RepositoryModule {}
