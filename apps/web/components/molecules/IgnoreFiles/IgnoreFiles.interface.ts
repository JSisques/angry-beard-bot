import { RootProps } from '@/interfaces/Root/Root.interface';

export interface IgnoreFilesProps extends RootProps {
  files: string[];
  onChange: (files: string[]) => void;
}
