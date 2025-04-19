import { RootProps } from '@/interfaces/Root/Root.interface';

export interface IgnoreFilesProps extends RootProps {
  extensions: string[];
  onChange: (extensions: string[]) => void;
}
