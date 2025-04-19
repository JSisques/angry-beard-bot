import { WorkflowSource } from '../enum/workflow-source.enum';

export interface WorkflowMetadata {
  requestId: string;
  source: WorkflowSource;
  installationId: number;
  commitSha: string;
}
