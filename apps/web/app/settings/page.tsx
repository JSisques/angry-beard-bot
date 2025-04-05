'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Github, Save, FileText, CheckCircle, Code2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const { repositories, addRepository, removeRepository } = useAppStore();
  const [newRepoInput, setNewRepoInput] = useState('');
  const [githubToken, setGithubToken] = useState('');

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

  const handleSaveSettings = () => {
    // Aquí iría la lógica para guardar la configuración
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen w-full bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure Angry Beard Bot's behavior and review criteria</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GitHub Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              GitHub Integration
            </CardTitle>
            <CardDescription>Connect your GitHub account and repositories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="github-token">GitHub Access Token</Label>
              <Input id="github-token" type="password" placeholder="ghp_..." value={githubToken} onChange={e => setGithubToken(e.target.value)} />
              <p className="text-sm text-muted-foreground">Required for accessing repositories and leaving comments</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Connected Repositories</Label>
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
                <div className="space-y-2">
                  {repositories.map(repo => (
                    <div key={repo.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        <span>
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
            </div>
          </CardContent>
        </Card>

        {/* Review Focus Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Review Focus Areas
            </CardTitle>
            <CardDescription>Configure what aspects the bot should focus on during reviews</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Code Style & Formatting</Label>
                <p className="text-sm text-muted-foreground">Check code style against ESLint and Prettier rules</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Best Practices & Patterns</Label>
                <p className="text-sm text-muted-foreground">Review for common anti-patterns and best practices</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Documentation & Comments</Label>
                <p className="text-sm text-muted-foreground">Ensure proper documentation and meaningful comments</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Testing & Coverage</Label>
                <p className="text-sm text-muted-foreground">Check for test coverage and quality</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* PR Description Enhancement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              PR Description Enhancement
            </CardTitle>
            <CardDescription>Configure how the bot enhances PR descriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-generate Descriptions</Label>
                <p className="text-sm text-muted-foreground">Generate detailed PR descriptions automatically</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Smart Title Generation</Label>
                <p className="text-sm text-muted-foreground">Suggest better PR titles based on changes</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Highlight Key Changes</Label>
                <p className="text-sm text-muted-foreground">Automatically highlight important modifications</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Auto-Approval Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Auto-Approval Rules
            </CardTitle>
            <CardDescription>Configure when the bot should auto-approve PRs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Simple Changes</Label>
                <p className="text-sm text-muted-foreground">Auto-approve minor changes and fixes</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Documentation Updates</Label>
                <p className="text-sm text-muted-foreground">Auto-approve documentation-only changes</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dependency Updates</Label>
                <p className="text-sm text-muted-foreground">Auto-approve dependency version updates</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <Button size="lg" onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
