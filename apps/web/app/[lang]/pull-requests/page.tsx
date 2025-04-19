import React from 'react';
import PullRequestPage from '@/components/pages/PullRequestPage/PullRequestPage';
import { getDictionary } from '@/lib/dictionary';

export default async function PullRequest({ params: { lang } }: { params: { lang: string } }) {
  const dictionary = await getDictionary(lang);

  return <PullRequestPage dictionary={dictionary} />;
}
