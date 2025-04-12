import { RootProps } from '@/interfaces/Root/Root.interface';

interface StatItem {
  label: string;
  value: string | number;
  change?: number;
}

export interface UsageStatsProps extends RootProps {
  stats: StatItem[];
}
