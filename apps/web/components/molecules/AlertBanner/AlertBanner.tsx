import React from 'react';
import { Card } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';

interface AlertBannerProps {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ title, message, type, actionLabel, onAction, onDismiss }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <Card className={`p-4 border ${getTypeStyles()}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm mt-1">{message}</p>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {actionLabel && onAction && (
            <Button variant="outline" size="sm" onClick={onAction} className="text-xs">
              {actionLabel}
            </Button>
          )}

          {onDismiss && (
            <button onClick={onDismiss} className="text-sm font-medium hover:opacity-70">
              Dismiss
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};
