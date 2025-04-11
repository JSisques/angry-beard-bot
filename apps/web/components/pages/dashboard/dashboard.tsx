'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GitPullRequest, Clock, Settings, Download, HelpCircle, Zap, ChevronRight, Activity, BarChart3, BookOpen } from 'lucide-react';
import { DashboardProps } from './dashboard.interface';
// Mock data - Replace with real data from your API
const mockData = {
  prs: {
    pending: 12,
    reviewed: 45,
    inProgress: 8,
  },
  credits: {
    used: 850,
    total: 1000,
  },
  recentActivity: [
    { id: 1, repo: 'frontend-app', pr: '#123', status: 'approved', time: '2h ago' },
    { id: 2, repo: 'backend-service', pr: '#456', status: 'pending', time: '3h ago' },
    { id: 3, repo: 'api-gateway', pr: '#789', status: 'in_progress', time: '5h ago' },
  ],
  stats: {
    totalPRs: 156,
    avgReviewTime: '1.5h',
    modelUsage: {
      'gpt-4': 65,
      'gpt-3.5': 35,
    },
  },
  plan: {
    name: 'Pro',
    features: ['Unlimited PRs', 'Priority Support', 'Custom Rules'],
  },
};

export function Dashboard({ dictionary }: DashboardProps) {
  return (
    <ScrollArea className="size-full bg-background">
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your PR review overview</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configure Bot
            </Button>
            <Button>
              <GitPullRequest className="w-4 h-4 mr-2" />
              View Pending PRs
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* PR Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitPullRequest className="w-5 h-5" />
                PR Status
              </CardTitle>
              <CardDescription>Current pull request overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Pending Review</span>
                  <Badge variant="secondary">{mockData.prs.pending}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>In Progress</span>
                  <Badge variant="secondary">{mockData.prs.inProgress}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Reviewed</span>
                  <Badge variant="secondary">{mockData.prs.reviewed}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credits Usage Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Credits Usage
              </CardTitle>
              <CardDescription>Monthly credit consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={(mockData.credits.used / mockData.credits.total) * 100} />
                <div className="flex justify-between text-sm">
                  <span>{mockData.credits.used} used</span>
                  <span>{mockData.credits.total} total</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Quick Stats
              </CardTitle>
              <CardDescription>Performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total PRs Reviewed</span>
                  <Badge variant="outline">{mockData.stats.totalPRs}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Avg. Review Time</span>
                  <Badge variant="outline">{mockData.stats.avgReviewTime}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest pull request reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                    <div className="flex items-center gap-4">
                      <GitPullRequest className="w-4 h-4" />
                      <div>
                        <p className="font-medium">{activity.repo}</p>
                        <p className="text-sm text-muted-foreground">{activity.pr}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={activity.status === 'approved' ? 'default' : 'secondary'}>{activity.status}</Badge>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plan & Support Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Plan & Support
              </CardTitle>
              <CardDescription>Current plan and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{mockData.plan.name} Plan</h3>
                  <ul className="mt-2 space-y-2">
                    {mockData.plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <ChevronRight className="w-4 h-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
