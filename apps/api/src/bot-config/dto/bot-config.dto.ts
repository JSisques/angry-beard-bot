import { BotLevel } from '@prisma/client';

export interface BotConfigDto {
  id?: string;
  userId: string;
  grumpinessLevel: BotLevel;
  technicalityLevel: BotLevel;
  detailLevel: BotLevel;
  language: string;
  autoApprove: boolean;
  ignoredExtensions: string[];
}
