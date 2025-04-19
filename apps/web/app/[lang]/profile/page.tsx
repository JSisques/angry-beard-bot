import ProfilePage from '@/components/pages/ProfilePage/ProfilePage';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';

export default async function Profile({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionary(params.lang);
  return <ProfilePage dictionary={dictionary} />;
}
