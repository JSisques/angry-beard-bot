import { WorkflowMetadata } from '../interface/workflow-metadata.interface';
import { WorkflowDataInterface } from '../interface/workflow-data-interface';
export class TriggerWorkflowDto {
  workflowMetadata?: WorkflowMetadata;
  workflowData?: WorkflowDataInterface;
}
