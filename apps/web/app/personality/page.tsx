'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Settings, Zap, MessageSquare, Save } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Switch } from '@/components/ui/switch';

export default function PersonalityPage() {
  const { botConfig, updateBotConfig } = useAppStore();
  const [showPreview, setShowPreview] = useState(false);

  const getGrumpinessLabel = (value: number) => {
    switch (value) {
      case 0:
        return 'Mild';
      case 50:
        return 'Moderate';
      default:
        return 'Extreme';
    }
  };

  const getTechnicalLabel = (value: number) => {
    switch (value) {
      case 0:
        return 'Basic';
      case 50:
        return 'Intermediate';
      default:
        return 'Advanced';
    }
  };

  const getDetailLabel = (value: number) => {
    switch (value) {
      case 0:
        return 'Concise';
      case 50:
        return 'Balanced';
      default:
        return 'Comprehensive';
    }
  };

  const handleSliderChange = (value: number[], type: 'grumpiness' | 'technical' | 'detail') => {
    // Convertir el valor a la posición más cercana (0, 50, 100)
    const position = value[0] <= 25 ? 0 : value[0] <= 75 ? 50 : 100;
    updateBotConfig({ [`${type}Level`]: position });
  };

  const handleSaveConfig = () => {
    // Aquí podríamos añadir lógica para guardar la configuración en un backend
    alert('Configuration saved successfully!');
  };

  const getPreviewComment = () => {
    const grumpiness = getGrumpinessLabel(botConfig.grumpinessLevel);
    const technical = getTechnicalLabel(botConfig.technicalLevel);
    const detail = getDetailLabel(botConfig.detailLevel);

    if (grumpiness === 'Mild') {
      return "I've reviewed your code and have some suggestions for improvement. Consider using more modern patterns and adding some documentation.";
    } else if (grumpiness === 'Moderate') {
      return "Oh look, another PR that needs my attention. Let's see what we've got here... *sigh* At least you're trying to follow best practices.";
    } else {
      return 'WHAT IS THIS ABOMINATION?! Did you even READ the style guide? *throws coffee mug* Let me tell you why this is completely unacceptable...';
    }
  };

  return (
    <div className="min-h-screen w-full bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Bot Personality Settings</h1>
        <p className="text-muted-foreground">Customize how Angry Beard Bot reviews your code</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Configuration */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Core Personality Traits
            </CardTitle>
            <CardDescription>Adjust the fundamental aspects of your bot's personality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="grumpiness">Grumpiness Level</Label>
                <Badge variant="outline">{getGrumpinessLabel(botConfig.grumpinessLevel)}</Badge>
              </div>
              <Slider
                id="grumpiness"
                min={0}
                max={100}
                step={50}
                value={[botConfig.grumpinessLevel]}
                onValueChange={value => handleSliderChange(value, 'grumpiness')}
                className="[&>span]:h-2 [&>span]:w-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Extreme</span>
              </div>
              <p className="text-sm text-muted-foreground">Controls how sarcastic and grumpy the bot's comments will be</p>
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
                step={50}
                value={[botConfig.technicalLevel]}
                onValueChange={value => handleSliderChange(value, 'technical')}
                className="[&>span]:h-2 [&>span]:w-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Basic</span>
                <span>Intermediate</span>
                <span>Advanced</span>
              </div>
              <p className="text-sm text-muted-foreground">Determines the complexity of technical feedback</p>
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
                step={50}
                value={[botConfig.detailLevel]}
                onValueChange={value => handleSliderChange(value, 'detail')}
                className="[&>span]:h-2 [&>span]:w-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Concise</span>
                <span>Balanced</span>
                <span>Comprehensive</span>
              </div>
              <p className="text-sm text-muted-foreground">Controls how thorough the reviews will be</p>
            </div>
          </CardContent>
        </Card>

        {/* Preview and Additional Settings */}
        <div className="space-y-6">
          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comment Preview
              </CardTitle>
              <CardDescription>See how your bot will comment on PRs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">{getPreviewComment()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Additional Settings
              </CardTitle>
              <CardDescription>Fine-tune your bot's behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-approve Simple Changes</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve minor changes</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Request Tests</Label>
                  <p className="text-sm text-muted-foreground">Always request tests for new features</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enforce Documentation</Label>
                  <p className="text-sm text-muted-foreground">Require documentation for changes</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <Button size="lg" onClick={handleSaveConfig}>
          <Save className="mr-2 h-4 w-4" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
