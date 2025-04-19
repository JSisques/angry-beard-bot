import { getDictionary } from '@/lib/dictionary';
import HomePage from '@/components/pages/HomePage/HomePage';

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const dictionary = await getDictionary(lang);

  return <HomePage dictionary={dictionary} />;
}
