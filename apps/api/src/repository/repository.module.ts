import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RepositoryController } from './repository.controller';

@Module({
  imports: [PrismaModule],
  providers: [RepositoryService],
  exports: [RepositoryService],
  controllers: [RepositoryController],
})
export class RepositoryModule {}
