import React from 'react';
import { LevelSlider } from '@/components/molecules/LevelSlider/LevelSlider';
import { IgnoreFiles } from '@/components/molecules/IgnoreFiles/IgnoreFiles';
import { BotConfigurationProps } from './BotConfiguration.interface';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../molecules/Select/Select';

export const BotConfiguration: React.FC<BotConfigurationProps> = ({
  language,
  grumpinessLevel,
  technicalityLevel,
  detailLevel,
  ignoredExtensions,
  onLanguageChange,
  onGrumpinessChange,
  onTechnicalityChange,
  onDetailChange,
  onIgnoredExtensionsChange,
  dictionary,
}) => {
  return (
    <div className="flex flex-col gap-8 p-6 bg-white rounded-lg shadow">
      <section className="flex flex-row w-full gap-4">
        <div className="flex flex-col w-full gap-2">
          <h2 className="text-xl font-semibold w-full">{dictionary.organisms.botConfiguration.languageSettings}</h2>
          <p className="text-sm text-gray-500">{dictionary.organisms.botConfiguration.languageSettingsDescription}</p>
        </div>
        <div className="flex items-center justify-end gap-4 w-full">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder={dictionary.organisms.botConfiguration.selectLanguage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{dictionary.organisms.botConfiguration.botPersonality}</h2>
        <LevelSlider
          label={dictionary.organisms.botConfiguration.grumpinessLevel}
          value={grumpinessLevel}
          min={1}
          max={5}
          onChange={onGrumpinessChange}
          description={dictionary.organisms.botConfiguration.grumpinessLevelDescription}
        />
        <LevelSlider
          label={dictionary.organisms.botConfiguration.technicalityLevel}
          value={technicalityLevel}
          min={1}
          max={5}
          onChange={onTechnicalityChange}
          description={dictionary.organisms.botConfiguration.technicalityLevelDescription}
        />
        <LevelSlider
          label={dictionary.organisms.botConfiguration.detailLevel}
          value={detailLevel}
          min={1}
          max={5}
          onChange={onDetailChange}
          description={dictionary.organisms.botConfiguration.detailLevelDescription}
        />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{dictionary.organisms.botConfiguration.ignoredExtensions}</h2>
        <p className="text-sm text-gray-500">{dictionary.organisms.botConfiguration.addFileExtensions}</p>
        <IgnoreFiles extensions={ignoredExtensions} onChange={onIgnoredExtensionsChange} dictionary={dictionary} />
      </section>
    </div>
  );
};
