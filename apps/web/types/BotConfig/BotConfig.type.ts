export type BotConfig = {
  id: string;
  userId: string;
  language: string;
  grumpinessLevel: number;
  technicalityLevel: number;
  detailLevel: number;
  ignoredExtensions: string[];
  autoApprove?: boolean;
};
