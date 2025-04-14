import React from 'react';
import { Progress } from '@/components/atoms/progress';
import { Card } from '@/components/molecules/card';
import { CreditsDisplayProps } from './CreditsDisplay.interface';
import { useQuery } from '@tanstack/react-query';
import { getCreditsInfo, calculatePercentage } from './CreditsDisplay.service';
import { useSession } from '@/hooks/use-session';

export const CreditsDisplay: React.FC<CreditsDisplayProps> = ({ usedCredits, totalCredits, dictionary }) => {
  const { user } = useSession();

  const {
    data: creditsInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['creditsInfo'],
    queryFn: () => getCreditsInfo(user?.id || ''),
  });

  console.log(JSON.stringify(creditsInfo, null, 2));

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{dictionary.molecules.creditsDisplay.title}</h3>
          <span className="text-sm text-muted-foreground">
            {creditsInfo?.remainingCredits} {dictionary.molecules.creditsDisplay.remainingCredits}
          </span>
        </div>
        <Progress value={calculatePercentage(creditsInfo?.remainingCredits || 0, creditsInfo?.totalCredits || 0)} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {creditsInfo?.usedCredits} {dictionary.molecules.creditsDisplay.usedCredits}
          </span>
          <span>
            {creditsInfo?.totalCredits} {dictionary.molecules.creditsDisplay.totalCredits}
          </span>
        </div>
      </div>
    </Card>
  );
};
