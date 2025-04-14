import { RootTemplateProps } from '@/components/templates/RootTemplate/RootTemplate.interface';

export interface CreditsDisplayProps extends RootTemplateProps {
  usedCredits: number;
  totalCredits: number;
}
