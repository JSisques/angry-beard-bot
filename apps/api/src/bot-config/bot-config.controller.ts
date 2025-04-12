import { Controller, Get, Post, Put, Delete, Param, Body, Logger } from '@nestjs/common';
import { BotConfigService } from './bot-config.service';
import { BotConfigDto, CreateBotConfigDto, UpdateBotConfigDto } from './dto/bot-config.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
@ApiTags('Bot Configuration')
@Controller('bot-config')
export class BotConfigController {
  private readonly logger;

  constructor(
    private readonly botConfigService: BotConfigService,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger(BotConfigController.name);
  }

  @ApiOperation({ summary: 'Get bot configuration by ID' })
  @ApiParam({ name: 'id', description: 'Bot configuration ID' })
  @ApiResponse({ status: 200, description: 'Bot configuration found', type: BotConfigDto })
  @ApiResponse({ status: 404, description: 'Bot configuration not found' })
  @Get(':id')
  async getBotConfigById(@Param('id') id: string): Promise<BotConfigDto> {
    this.logger.debug(`Getting bot config for id: ${id}`);
    const botConfig = await this.botConfigService.getBotConfigById(id);
    this.logger.debug(`Bot config: ${JSON.stringify(botConfig)}`);
    return botConfig;
  }

  @ApiOperation({ summary: 'Get bot configuration by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Bot configuration found', type: BotConfigDto })
  @ApiResponse({ status: 404, description: 'Bot configuration not found' })
  @Get('user/:userId')
  async getBotConfigByUserId(@Param('userId') userId: string): Promise<BotConfigDto> {
    this.logger.debug(`Getting bot config for userId: ${userId}`);
    const botConfig = await this.botConfigService.getBotConfigByUserId(userId);
    this.logger.debug(`Bot config: ${JSON.stringify(botConfig)}`);
    return botConfig;
  }

  @ApiOperation({ summary: 'Get bot configuration by supabase ID' })
  @ApiParam({ name: 'supabaseId', description: 'Supabase ID' })
  @ApiResponse({ status: 200, description: 'Bot configuration found', type: BotConfigDto })
  @ApiResponse({ status: 404, description: 'Bot configuration not found' })
  @Get('supabase/:supabaseId')
  async getBotConfigBySupabaseId(@Param('supabaseId') supabaseId: string): Promise<BotConfigDto> {
    this.logger.debug(`Getting bot config for supabaseId: ${supabaseId}`);
    const user = await this.userService.getUserBySupabaseId(supabaseId);
    this.logger.debug(`User: ${JSON.stringify(user)}`);
    return user.botConfig;
  }

  @ApiOperation({ summary: 'Create new bot configuration' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiBody({ type: CreateBotConfigDto })
  @ApiResponse({ status: 201, description: 'Bot configuration created', type: BotConfigDto })
  @Post(':userId')
  async createBotConfig(@Body() botConfig: CreateBotConfigDto, @Param('userId') userId: string): Promise<BotConfigDto> {
    this.logger.debug(`Creating bot config: ${JSON.stringify(botConfig)}`);
    const newBotConfig = await this.botConfigService.createBotConfig(userId, botConfig);
    this.logger.debug(`New bot config: ${JSON.stringify(newBotConfig)}`);
    return newBotConfig;
  }

  @ApiOperation({ summary: 'Update bot configuration' })
  @ApiParam({ name: 'id', description: 'Bot configuration ID' })
  @ApiBody({ type: UpdateBotConfigDto })
  @ApiResponse({ status: 200, description: 'Bot configuration updated', type: BotConfigDto })
  @ApiResponse({ status: 404, description: 'Bot configuration not found' })
  @Put(':id')
  async updateBotConfig(@Param('id') id: string, @Body() botConfig: UpdateBotConfigDto): Promise<BotConfigDto> {
    this.logger.debug(`Updating bot config for id: ${id}`);
    const updatedBotConfig = await this.botConfigService.updateBotConfig(id, botConfig);
    this.logger.debug(`Updated bot config: ${JSON.stringify(updatedBotConfig)}`);
    return updatedBotConfig;
  }

  @ApiOperation({ summary: 'Delete bot configuration' })
  @ApiParam({ name: 'id', description: 'Bot configuration ID' })
  @ApiResponse({ status: 200, description: 'Bot configuration deleted successfully' })
  @ApiResponse({ status: 404, description: 'Bot configuration not found' })
  @Delete(':id')
  async deleteBotConfig(@Param('id') id: string): Promise<void> {
    this.logger.debug(`Deleting bot config for id: ${id}`);
    await this.botConfigService.deleteBotConfig(id);
    this.logger.debug(`Bot config deleted for id: ${id}`);
  }
}
