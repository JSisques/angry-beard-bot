'use client';

import React, { useState } from 'react';
import { BotSettingsPageProps } from './BotSettingsPage.interface';
import RootTemplate from '@/components/templates/RootTemplate/RootTemplate';
import { BotConfiguration } from '@/components/organisms/BotConfiguration/BotConfiguration';
import { Button } from '@/components/atoms/button';

const BotSettingsPage = ({ dictionary }: BotSettingsPageProps) => {
  const [language, setLanguage] = useState('en');
  const [grumpinessLevel, setGrumpinessLevel] = useState(3);
  const [technicalityLevel, setTechnicalityLevel] = useState(3);
  const [detailLevel, setDetailLevel] = useState(3);
  const [ignoredFiles, setIgnoredFiles] = useState<string[]>([]);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving configuration...', {
      language,
      grumpinessLevel,
      technicalityLevel,
      detailLevel,
      ignoredFiles,
    });
  };

  return (
    <RootTemplate dictionary={dictionary}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Bot Configuration</h1>
          <p className="text-sm text-muted-foreground">Customize your Angry Beard Bot settings</p>
        </div>
        <Button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
          Save Changes
        </Button>
      </div>

      <BotConfiguration
        dictionary={dictionary}
        language={language}
        grumpinessLevel={grumpinessLevel}
        technicalityLevel={technicalityLevel}
        detailLevel={detailLevel}
        ignoredFiles={ignoredFiles}
        onLanguageChange={setLanguage}
        onGrumpinessChange={setGrumpinessLevel}
        onTechnicalityChange={setTechnicalityLevel}
        onDetailChange={setDetailLevel}
        onIgnoredFilesChange={setIgnoredFiles}
      />
    </RootTemplate>
  );
};

export default BotSettingsPage;
