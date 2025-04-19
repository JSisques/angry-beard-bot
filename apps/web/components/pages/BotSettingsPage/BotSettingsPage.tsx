'use client';

import React, { useState } from 'react';
import { BotSettingsPageProps } from './BotSettingsPage.interface';
import RootTemplate from '@/components/templates/RootTemplate/RootTemplate';
import { BotConfiguration } from '@/components/organisms/BotConfiguration/BotConfiguration';
import { Button } from '@/components/atoms/button';
import { useSession } from '@/hooks/use-session';
import Loading from '@/app/loading';
import { useBotConfig, useUpdateBotConfig } from '@/services/botConfig.service';
import PageHeader from '@/components/organisms/PageHeader/PageHeader';

const BotSettingsPage = ({ dictionary }: BotSettingsPageProps) => {
  const { user } = useSession();
  const { data: botConfig } = useBotConfig(user?.id || '');
  const { mutate: updateConfig } = useUpdateBotConfig(user?.id || '');

  const [language, setLanguage] = useState(botConfig?.language || 'en');
  const [grumpinessLevel, setGrumpinessLevel] = useState(botConfig?.grumpinessLevel || 3);
  const [technicalityLevel, setTechnicalityLevel] = useState(botConfig?.technicalityLevel || 3);
  const [detailLevel, setDetailLevel] = useState(botConfig?.detailLevel || 3);
  const [ignoredExtensions, setIgnoredExtensions] = useState<string[]>(botConfig?.ignoredExtensions || []);

  if (!user) return <Loading />;

  const handleSave = () => {
    if (!botConfig?.id) {
      console.error('No bot config ID found');
      return;
    }
    updateConfig({
      id: botConfig.id,
      language,
      //   grumpinessLevel,
      //   technicalityLevel,
      //   detailLevel,
      ignoredExtensions,
    });
  };

  return (
    <RootTemplate dictionary={dictionary}>
      <PageHeader
        title={dictionary.pages.botSettings.title}
        description={dictionary.pages.botSettings.description}
        buttonText={dictionary.common.save}
        buttonOnClick={handleSave}
      />

      <BotConfiguration
        dictionary={dictionary}
        language={botConfig?.language || 'en'}
        grumpinessLevel={botConfig?.grumpinessLevel || 3}
        technicalityLevel={botConfig?.technicalityLevel || 3}
        detailLevel={botConfig?.detailLevel || 3}
        ignoredExtensions={botConfig?.ignoredExtensions || []}
        onLanguageChange={setLanguage}
        onGrumpinessChange={setGrumpinessLevel}
        onTechnicalityChange={setTechnicalityLevel}
        onDetailChange={setDetailLevel}
        onIgnoredExtensionsChange={setIgnoredExtensions}
      />
    </RootTemplate>
  );
};

export default BotSettingsPage;
