import { useToast as useToastUI } from '@/components/atoms/toast';

export interface Toast {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export const useToast = () => {
  const { toast } = useToastUI();

  return {
    toast: (props: Toast) => {
      toast({
        ...props,
        duration: 5000,
      });
    },
  };
};
