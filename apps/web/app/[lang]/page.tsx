'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Github, Settings, Zap, Star, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';
import { useDictionary } from '@/hooks/use-dictionary';
import { useParams } from 'next/navigation';
import Loading from '@/app/loading';

// Mock data for statistics
const mockStats = {
  totalPRs: 156,
  reviewedPRs: 142,
  averageResponseTime: '2.5h',
  approvalRate: '85%',
  totalComments: 892,
  topRepositories: [
    { name: 'frontend-app', prs: 45 },
    { name: 'backend-service', prs: 38 },
    { name: 'api-gateway', prs: 32 },
  ],
};

export default function Home() {
  const { lang } = useParams();
  const { dictionary } = useDictionary(lang as string);
  const [newRepoInput, setNewRepoInput] = useState('');
  const { repositories, botConfig, addRepository, removeRepository, updateBotConfig } = useAppStore();

  const handleAddRepository = () => {
    if (!newRepoInput) return;

    const [owner, name] = newRepoInput.split('/');
    if (!owner || !name) {
      alert('Please enter repository in format: owner/repository');
      return;
    }

    addRepository({
      id: uuidv4(),
      owner,
      name,
      url: `https://github.com/${owner}/${name}`,
    });

    setNewRepoInput('');
  };

  const getGrumpinessLabel = (value: number) => {
    if (value < 33) return 'Mild';
    if (value < 66) return 'Moderate';
    return 'Extreme';
  };

  const getTechnicalLabel = (value: number) => {
    if (value < 33) return 'Basic';
    if (value < 66) return 'Intermediate';
    return 'Advanced';
  };

  const getDetailLabel = (value: number) => {
    if (value < 33) return 'Concise';
    if (value < 66) return 'Balanced';
    return 'Comprehensive';
  };

  const handleSaveConfig = () => {
    alert('Configuration saved successfully!');
  };

  if (!dictionary) return <Loading />;

  return (
    <div className="min-h-screen w-full bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{dictionary.common.appName}</h1>
        <p className="text-muted-foreground">{dictionary.common.appDescription}</p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats and Repositories */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Your bot's performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">{mockStats.totalPRs}</div>
                  <p className="text-xs text-muted-foreground">Total PRs</p>
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">{mockStats.averageResponseTime}</div>
                  <p className="text-xs text-muted-foreground">Avg. Response</p>
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">{mockStats.approvalRate}</div>
                  <p className="text-xs text-muted-foreground">Approval Rate</p>
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">{mockStats.totalComments}</div>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connected Repositories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                Connected Repositories
              </CardTitle>
              <CardDescription>Manage repositories for Angry Beard Bot to review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="owner/repository"
                  value={newRepoInput}
                  onChange={e => setNewRepoInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddRepository()}
                />
                <Button onClick={handleAddRepository}>Add</Button>
              </div>

              {repositories.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No repositories</AlertTitle>
                  <AlertDescription>Add repositories to get started with Angry Beard Bot</AlertDescription>
                </Alert>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {repositories.map(repo => (
                    <div key={repo.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        <span className="font-medium">
                          {repo.owner}/{repo.name}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeRepository(repo.id)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Repositories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Repositories
              </CardTitle>
              <CardDescription>Most active repositories by PR count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStats.topRepositories.map((repo, index) => (
                  <div key={repo.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium">{repo.name}</p>
                        <p className="text-sm text-muted-foreground">{repo.prs} PRs reviewed</p>
                      </div>
                    </div>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Bot Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Bot Personality
              </CardTitle>
              <CardDescription>Customize your reviewer's attitude</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="grumpiness">Grumpiness</Label>
                  <Badge variant="outline">{getGrumpinessLabel(botConfig.grumpinessLevel)}</Badge>
                </div>
                <Slider
                  id="grumpiness"
                  min={0}
                  max={100}
                  step={1}
                  value={[botConfig.grumpinessLevel]}
                  onValueChange={value => updateBotConfig({ grumpinessLevel: value[0] })}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="technical">Technical Level</Label>
                  <Badge variant="outline">{getTechnicalLabel(botConfig.technicalLevel)}</Badge>
                </div>
                <Slider
                  id="technical"
                  min={0}
                  max={100}
                  step={1}
                  value={[botConfig.technicalLevel]}
                  onValueChange={value => updateBotConfig({ technicalLevel: value[0] })}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="detail">Detail Level</Label>
                  <Badge variant="outline">{getDetailLabel(botConfig.detailLevel)}</Badge>
                </div>
                <Slider
                  id="detail"
                  min={0}
                  max={100}
                  step={1}
                  value={[botConfig.detailLevel]}
                  onValueChange={value => updateBotConfig({ detailLevel: value[0] })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSaveConfig}>
                <Zap className="mr-2 h-4 w-4" />
                Update Personality
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
