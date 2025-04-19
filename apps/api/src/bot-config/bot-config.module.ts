import { Module } from '@nestjs/common';
import { BotConfigService } from './bot-config.service';
import { BotConfigController } from './bot-config.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [PrismaModule],
  providers: [BotConfigService, UserService],
  controllers: [BotConfigController],
  exports: [BotConfigService],
})
export class BotConfigModule {}
