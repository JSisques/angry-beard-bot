import { IsUUID, IsString, IsOptional, IsNumber, IsEnum, IsArray } from 'class-validator';
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

  @IsArray()
  @IsOptional()
  output?: LLMOutputDto[];

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

export class LLMOutputDto {
  @IsString()
  comment?: string;

  @IsNumber()
  line?: number;
}
