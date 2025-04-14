import React from 'react';
import { PageHeaderProps } from './PageHeader.interface';
import { Button } from '@/components/atoms/button';

const PageHeader = ({ title, description, buttonText, buttonOnClick }: PageHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {buttonText && (
        <Button onClick={buttonOnClick} className="flex items-center space-x-2">
          <span>{buttonText}</span>
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
