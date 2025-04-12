import { Injectable, Logger } from '@nestjs/common';
import { BotConfigDto, CreateBotConfigDto, UpdateBotConfigDto } from './dto/bot-config.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BotConfigService {
  private readonly logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(BotConfigService.name);
  }

  /**
   * Retrieves a bot configuration by its ID
   * @param id - The unique identifier of the bot configuration
   * @returns A promise that resolves to the bot configuration
   * @throws {NotFoundException} If no configuration is found with the given ID
   */
  async getBotConfigById(id: string): Promise<BotConfigDto> {
    this.logger.debug(`Getting bot config for id: ${id}`);
    const botConfig = await this.prisma.botConfig.findUnique({ where: { id } });
    this.logger.debug(`Bot config: ${JSON.stringify(botConfig)}`);
    return botConfig;
  }

  /**
   * Retrieves a bot configuration by user ID
   * @param userId - The ID of the user whose configuration to retrieve
   * @returns A promise that resolves to the bot configuration
   * @throws {NotFoundException} If no configuration is found for the user
   */
  async getBotConfigByUserId(userId: string): Promise<BotConfigDto> {
    this.logger.debug(`Getting bot config for userId: ${userId}`);
    const botConfig = await this.prisma.botConfig.findUnique({ where: { userId } });
    this.logger.debug(`Bot config: ${JSON.stringify(botConfig)}`);
    return botConfig;
  }

  /**
   * Creates a new bot configuration for a user
   * @param userId - The ID of the user to create the configuration for
   * @param botConfig - The configuration data to create
   * @returns A promise that resolves to the created bot configuration
   */
  async createBotConfig(userId: string, botConfig: CreateBotConfigDto): Promise<BotConfigDto> {
    this.logger.debug(`Creating bot config for userId: ${userId}`);
    const newBotConfig = await this.prisma.botConfig.create({ data: { ...botConfig, userId } });
    this.logger.debug(`New bot config: ${JSON.stringify(newBotConfig)}`);
    return newBotConfig;
  }

  /**
   * Updates an existing bot configuration
   * @param userId - The ID of the user whose configuration to update
   * @param botConfig - The updated configuration data
   * @returns A promise that resolves to the updated bot configuration
   * @throws {NotFoundException} If no configuration is found for the user
   */
  async updateBotConfig(userId: string, botConfig: UpdateBotConfigDto): Promise<BotConfigDto> {
    this.logger.debug(`Updating bot config for userId: ${userId}`);
    const updatedBotConfig = await this.prisma.botConfig.update({ where: { userId }, data: botConfig });
    this.logger.debug(`Updated bot config: ${JSON.stringify(updatedBotConfig)}`);
    return updatedBotConfig;
  }

  /**
   * Deletes a bot configuration
   * @param userId - The ID of the user whose configuration to delete
   * @returns A promise that resolves when the configuration is deleted
   * @throws {NotFoundException} If no configuration is found for the user
   */
  async deleteBotConfig(userId: string): Promise<void> {
    this.logger.debug(`Deleting bot config for userId: ${userId}`);
    await this.prisma.botConfig.delete({ where: { userId } });
    this.logger.debug(`Bot config deleted for userId: ${userId}`);
  }
}
