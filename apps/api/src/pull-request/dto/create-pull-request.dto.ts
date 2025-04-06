import { PullRequestStatus } from '@prisma/client';
import { IsString, IsOptional, IsUrl, IsBoolean, IsNumber, IsDate } from 'class-validator';

export class CreatePullRequestDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  body?: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsUrl()
  @IsOptional()
  htmlUrl?: string;

  @IsUrl()
  @IsOptional()
  diffUrl?: string;

  @IsUrl()
  @IsOptional()
  patchUrl?: string;

  @IsUrl()
  @IsOptional()
  issueUrl?: string;

  @IsUrl()
  @IsOptional()
  commitsUrl?: string;

  @IsUrl()
  @IsOptional()
  reviewCommentsUrl?: string;

  @IsUrl()
  @IsOptional()
  commentsUrl?: string;

  @IsUrl()
  @IsOptional()
  statusesUrl?: string;

  @IsBoolean()
  @IsOptional()
  isMerged?: boolean;

  @IsBoolean()
  @IsOptional()
  isMergeable?: boolean;

  @IsBoolean()
  @IsOptional()
  isRebaseable?: boolean;

  @IsNumber()
  @IsOptional()
  number?: number;

  @IsString()
  @IsOptional()
  state?: string;

  @IsNumber()
  @IsOptional()
  commits?: number;

  @IsNumber()
  @IsOptional()
  additions?: number;

  @IsNumber()
  @IsOptional()
  deletions?: number;

  @IsNumber()
  @IsOptional()
  changedFiles?: number;

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean;

  @IsString()
  @IsOptional()
  githubId?: string;

  @IsOptional()
  status?: PullRequestStatus;

  @IsDate()
  @IsOptional()
  mergedAt?: Date;
}
