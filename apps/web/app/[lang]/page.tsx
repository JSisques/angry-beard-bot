'use client';
import { useDictionary } from '@/hooks/use-dictionary';
import { useParams } from 'next/navigation';
import Loading from '@/app/loading';
import { Dashboard } from '@/components/pages/dashboard/dashboard';

export default function Home() {
  const { lang } = useParams();
  const { dictionary } = useDictionary(lang as string);

  if (!dictionary) return <Loading />;

  return <Dashboard dictionary={dictionary} />;
}
