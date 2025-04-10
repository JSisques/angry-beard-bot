import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  pullRequestId: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  @IsOptional()
  filename?: string;

  @IsString()
  @IsOptional()
  patch?: string;

  @IsNumber()
  @IsOptional()
  creditsUsed?: number;
}
