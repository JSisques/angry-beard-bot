export interface BotConfigDto {
  id?: string;
  repositoryId: string;
  grumpinessLevel: 'MILD' | 'MODERATE' | 'EXTREME';
  technicalityLevel: 'MILD' | 'MODERATE' | 'EXTREME';
  detailLevel: 'MILD' | 'MODERATE' | 'EXTREME';
  language: string;
  autoApprove: boolean;
  reviewFocusAreas?: ReviewFocusArea[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReviewFocusArea {
  id?: string;
  name: string;
  botConfigId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
