import { getDictionary } from '@/lib/dictionary';
import AuthPage from '@/components/pages/AuthPage/AuthPage';

export default async function Auth({ params: { lang } }: { params: { lang: string } }) {
  const dictionary = await getDictionary(lang);

  return <AuthPage dictionary={dictionary} />;
}
