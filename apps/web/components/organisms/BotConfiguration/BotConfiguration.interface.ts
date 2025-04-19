import { RootProps } from '@/interfaces/Root/Root.interface';

export interface BotConfigurationProps extends RootProps {
  language: string;
  grumpinessLevel: number;
  technicalityLevel: number;
  detailLevel: number;
  ignoredExtensions: string[];
  onLanguageChange: (language: string) => void;
  onGrumpinessChange: (level: number) => void;
  onTechnicalityChange: (level: number) => void;
  onDetailChange: (level: number) => void;
  onIgnoredExtensionsChange: (extensions: string[]) => void;
}
