import { BotLevel } from '@prisma/client';
import { IsUUID, IsEnum, IsString, IsBoolean, IsArray } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class BotConfigDto {
  @ApiProperty({
    description: 'Unique identifier for the bot configuration',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'User ID associated with this bot configuration',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Level of grumpiness for the bot personality',
    enum: BotLevel,
    example: BotLevel.MODERATE,
  })
  @IsEnum(BotLevel)
  grumpinessLevel: BotLevel;

  @ApiProperty({
    description: 'Level of technical language used by the bot',
    enum: BotLevel,
    example: BotLevel.EXTREME,
  })
  @IsEnum(BotLevel)
  technicalityLevel: BotLevel;

  @ApiProperty({
    description: 'Level of detail in bot responses',
    enum: BotLevel,
    example: BotLevel.MODERATE,
  })
  @IsEnum(BotLevel)
  detailLevel: BotLevel;

  @ApiProperty({
    description: 'Language for bot responses',
    example: 'en',
  })
  @IsString()
  language: string;

  @ApiProperty({
    description: 'Whether to automatically approve changes',
    example: false,
  })
  @IsBoolean()
  autoApprove: boolean;

  @ApiProperty({
    description: 'File extensions to ignore during code review',
    example: ['log', 'txt', 'md'],
  })
  @IsArray()
  ignoredExtensions: string[];
}

export class CreateBotConfigDto extends OmitType(BotConfigDto, ['id']) {}

export class UpdateBotConfigDto extends PartialType(CreateBotConfigDto) {}
