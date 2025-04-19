import { getDictionary } from '@/lib/dictionary';
import BotSettingsPage from '@/components/pages/BotSettingsPage/BotSettingsPage';

export default async function BotSettings({ params: { lang } }: { params: { lang: string } }) {
  const dictionary = await getDictionary(lang);

  return <BotSettingsPage dictionary={dictionary} />;
}
