import React from 'react';
import { Progress } from '@/components/atoms/progress';
import { Card } from '@/components/molecules/card';

interface CreditsDisplayProps {
  usedCredits: number;
  totalCredits: number;
}

export const CreditsDisplay: React.FC<CreditsDisplayProps> = ({ usedCredits, totalCredits }) => {
  const percentage = (usedCredits / totalCredits) * 100;
  const remainingCredits = totalCredits - usedCredits;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Credits Usage</h3>
          <span className="text-sm text-muted-foreground">{remainingCredits} credits remaining</span>
        </div>
        <Progress value={percentage} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{usedCredits} used</span>
          <span>{totalCredits} total</span>
        </div>
      </div>
    </Card>
  );
};
