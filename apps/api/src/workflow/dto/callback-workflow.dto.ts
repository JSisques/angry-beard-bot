import { IsUUID, IsString } from 'class-validator';

export class WorkflowCallbackDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  pullRequestId: string;

  @IsString()
  output: string;
}
