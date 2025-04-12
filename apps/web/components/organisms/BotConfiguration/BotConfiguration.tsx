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
  ignoredFiles,
  onLanguageChange,
  onGrumpinessChange,
  onTechnicalityChange,
  onDetailChange,
  onIgnoredFilesChange,
  dictionary,
}) => {
  return (
    <div className="flex flex-col gap-8 p-6 bg-white rounded-lg shadow">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Language Settings</h2>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Bot Personality</h2>
        <LevelSlider
          label="Grumpiness Level"
          value={grumpinessLevel}
          min={1}
          max={5}
          onChange={onGrumpinessChange}
          description="How grumpy and sarcastic the bot should be"
        />
        <LevelSlider
          label="Technicality Level"
          value={technicalityLevel}
          min={1}
          max={5}
          onChange={onTechnicalityChange}
          description="How technical and detailed the feedback should be"
        />
        <LevelSlider
          label="Detail Level"
          value={detailLevel}
          min={1}
          max={5}
          onChange={onDetailChange}
          description="How thorough the code review should be"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Ignored Files</h2>
        <p className="text-sm text-gray-500">Add file patterns that should be ignored during code review</p>
        <IgnoreFiles files={ignoredFiles} onChange={onIgnoredFilesChange} dictionary={dictionary} />
      </section>
    </div>
  );
};
