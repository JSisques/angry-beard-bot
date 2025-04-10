import { IsUUID, IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { WorkflowSource } from 'src/workflow/enum/workflow-source.enum';
export class WorkflowCallbackDto {
  @IsUUID()
  userId: string;

  @IsEnum(WorkflowSource)
  source: WorkflowSource;

  @IsUUID()
  pullRequestId: string;

  @IsString()
  @IsOptional()
  pullRequestUrl?: string;

  @IsString()
  @IsOptional()
  output?: string;

  @IsString()
  @IsOptional()
  filename?: string;

  @IsString()
  @IsOptional()
  patch?: string;

  @IsString()
  @IsOptional()
  commitSha?: string;

  @IsNumber()
  @IsOptional()
  startLine?: number;

  @IsNumber()
  @IsOptional()
  endLine?: number;

  @IsNumber()
  installationId: number;
}
