import NotFoundPage from '@/components/pages/NotFoundPage/NotFoundPage';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';

export default async function NotFound({ params: { lang } }: { params: { lang: string } }) {
  const dictionary = await getDictionary(lang);

  return <NotFoundPage dictionary={dictionary} />;
}
