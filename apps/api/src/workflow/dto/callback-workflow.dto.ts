import { IsUUID, IsString, IsOptional } from 'class-validator';

export class WorkflowCallbackDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  pullRequestId: string;

  @IsString()
  @IsOptional()
  output?: string;

  @IsString()
  @IsOptional()
  filename?: string;

  @IsString()
  @IsOptional()
  patch?: string;
}
