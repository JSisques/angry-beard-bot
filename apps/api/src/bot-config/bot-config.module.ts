import { Module } from '@nestjs/common';
import { BotConfigService } from './bot-config.service';
import { BotConfigController } from './bot-config.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [BotConfigService],
  controllers: [BotConfigController],
  exports: [BotConfigService],
})
export class BotConfigModule {}
