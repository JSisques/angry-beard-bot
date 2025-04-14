'use client';
import React from 'react';
import { ReviewsPageProps } from './ReviewsPage.interface';
import RootTemplate from '@/components/templates/RootTemplate/RootTemplate';
import PageHeader from '@/components/organisms/PageHeader/PageHeader';
import { RecentReviews } from '@/components/molecules/RecentReviews/RecentReviews';

const ReviewsPage = ({ dictionary }: ReviewsPageProps) => {
  return (
    <RootTemplate dictionary={dictionary}>
      <PageHeader title={dictionary.pages.reviews.title} description={dictionary.pages.reviews.description} />
      <RecentReviews dictionary={dictionary} />
    </RootTemplate>
  );
};

export default ReviewsPage;
