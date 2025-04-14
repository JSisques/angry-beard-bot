'use client';

import RootTemplate from '@/components/templates/RootTemplate/RootTemplate';
import React, { useState } from 'react';
import { HomePageProps } from './HomePage.interface';
import { CreditsDisplay } from '@/components/molecules/CreditsDisplay/CreditsDisplay';
import { PullRequestList } from '@/components/molecules/PullRequestList/PullRequestList';
import { Button } from '@/components/atoms/button';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { PlanDisplay } from '@/components/molecules/PlanDisplay/PlanDisplay';
import { UsageStats } from '@/components/molecules/UsageStats/UsageStats';
import { BotConfigDisplay } from '@/components/molecules/BotConfigDisplay/BotConfigDisplay';
import { ConnectedRepos } from '@/components/molecules/ConnectedRepos/ConnectedRepos';
import { RecentReviews } from '@/components/molecules/RecentReviews/RecentReviews';
import { useSession } from '@/hooks/use-session';
import Loading from '@/app/loading';

const HomePage = ({ dictionary }: HomePageProps) => {
  const router = useRouter();
  const { user } = useSession();

  if (!user) return <Loading />;

  // Mock data for plan display
  const mockPlanFeatures = [
    { name: 'Title and description improvements', included: true },
    { name: 'Basic best practices comments', included: true },
    { name: 'Automatic review after each commit and PR', included: true },
    { name: 'Unlimited public and private repositories', included: true },
    { name: 'Detailed code comments', included: false },
    { name: 'Customizable bot personality', included: false },
  ];

  // Mock data for usage stats
  const mockUsageStats = [
    { label: 'Reviews this month', value: 24, change: 15 },
    { label: 'Files reviewed', value: 87, change: 8 },
    { label: 'Comments made', value: 156, change: -5 },
  ];

  // Mock data for bot configuration
  const mockBotConfig = {
    grumpinessLevel: 'Moderate' as const,
    technicalLevel: 'Intermediate' as const,
    detailLevel: 'Balanced' as const,
    reviewFocusAreas: ['Code Style', 'Best Practices', 'Documentation', 'Testing'],
  };

  // Mock data for connected repositories
  const mockRepositories = [
    {
      id: '1',
      name: 'angry-beard-bot',
      owner: 'javichu',
      isPrivate: false,
      lastReviewDate: '2024-04-10',
    },
    {
      id: '2',
      name: 'my-project',
      owner: 'javichu',
      isPrivate: true,
      lastReviewDate: '2024-04-05',
    },
  ];

  return (
    <RootTemplate dictionary={dictionary}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{dictionary.pages.home.title}</h1>
          <p className="text-sm text-muted-foreground">{dictionary.pages.home.description}</p>
        </div>

        <Button onClick={() => router.push(routes.botSettings.path)} className="flex items-center space-x-2">
          <span>{dictionary.pages.home.settings}</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 ">
        <CreditsDisplay usedCredits={150} totalCredits={1000} dictionary={dictionary} />
        <PlanDisplay planName="The Grumpy Dev" price="€20" period="monthly" features={mockPlanFeatures} isCurrentPlan={true} />
      </div>

      <div className="">
        <UsageStats stats={mockUsageStats} dictionary={dictionary} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 ">
        <BotConfigDisplay {...mockBotConfig} />
        <ConnectedRepos dictionary={dictionary} repositories={mockRepositories} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PullRequestList dictionary={dictionary} />
        <RecentReviews dictionary={dictionary} />
      </div>
    </RootTemplate>
  );
};

export default HomePage;
