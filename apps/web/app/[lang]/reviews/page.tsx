import ReviewsPage from '@/components/pages/ReviewsPage/ReviewsPage';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';

export default async function Reviews({ params: { lang } }: { params: { lang: string } }) {
  const dictionary = await getDictionary(lang);

  return <ReviewsPage dictionary={dictionary} />;
}
