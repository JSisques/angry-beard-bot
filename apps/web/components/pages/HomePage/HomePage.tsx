'use client';

import RootTemplate from '@/components/templates/RootTemplate/RootTemplate';
import React, { useState } from 'react';
import { HomePageProps } from './HomePage.interface';
import { CreditsDisplay } from '@/components/molecules/CreditsDisplay/CreditsDisplay';
import { PullRequestList } from '@/components/molecules/PullRequestList/PullRequestList';
import { Button } from '@/components/atoms/button';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants/routes';
import { PlanDisplay } from '@/components/molecules/PlanDisplay/PlanDisplay';
import { UsageStats } from '@/components/molecules/UsageStats/UsageStats';
import { BotConfigDisplay } from '@/components/molecules/BotConfigDisplay/BotConfigDisplay';
import { ConnectedRepos } from '@/components/molecules/ConnectedRepos/ConnectedRepos';
import { RecentReviews } from '@/components/molecules/RecentReviews/RecentReviews';
import { useSession } from '@/hooks/use-session';
import Loading from '@/app/loading';
import { useReviews } from '@/components/molecules/RecentReviews/RecentReviews.service';

const HomePage = ({ dictionary }: HomePageProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useSession();

  const { data: reviews, isLoading, error } = useReviews(user?.id || '');

  console.log(JSON.stringify(reviews, null, 2));

  if (!user) return <Loading />;

  // Mock data - Replace with actual data from your API
  const mockPullRequests = [
    {
      id: '1',
      title: 'Add new feature',
      repository: 'repo-name',
      status: 'open' as const,
      createdAt: '2024-04-12',
    },
    // Add more mock PRs as needed
  ];

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

  // Mock data for recent reviews
  const mockReviews = [
    {
      id: '1',
      repository: 'javichu/angry-beard-bot',
      pullRequestTitle: 'Add new feature',
      pullRequestNumber: 42,
      date: '2024-04-12',
      status: 'approved' as const,
      commentCount: 3,
    },
    {
      id: '2',
      repository: 'javichu/my-project',
      pullRequestTitle: 'Fix bug in login flow',
      pullRequestNumber: 15,
      date: '2024-04-10',
      status: 'changes_requested' as const,
      commentCount: 5,
    },
  ];

  return (
    <RootTemplate dictionary={dictionary}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome to the dashboard</p>
        </div>

        <Button onClick={() => router.push(routes.botSettings.path)} className="flex items-center space-x-2">
          <span>Settings</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 ">
        <CreditsDisplay usedCredits={150} totalCredits={1000} />
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
        <PullRequestList
          dictionary={dictionary}
          pullRequests={mockPullRequests}
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
        <RecentReviews reviews={reviews} dictionary={dictionary} />
      </div>
    </RootTemplate>
  );
};

export default HomePage;
