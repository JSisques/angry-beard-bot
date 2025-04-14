'use client';

import React from 'react';
import { Card } from '@/components/atoms/card';
import { RecentReviewsProps } from './RecentReviews.interface';
import { Pagination, PaginationPrevious, PaginationLink, PaginationNext, PaginationContent, PaginationItem } from '@/components/molecules/pagination';
import { usePagination } from '@/hooks/usePagination';
import { useReviews } from './RecentReviews.service';
import { useSession } from '@/hooks/use-session';

export const RecentReviews: React.FC<RecentReviewsProps> = ({ dictionary }) => {
  const { user } = useSession();
  const reviewsPagination = usePagination();
  const { data: reviews, isLoading, error } = useReviews(user?.id || '', reviewsPagination.currentPage);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{dictionary.molecules.recentReviews.title}</h3>

      {reviews?.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          <p>{dictionary.molecules.recentReviews.noReviews}</p>
          <p className="text-sm mt-1">{dictionary.molecules.recentReviews.noReviewsDescription}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews?.map(review => (
            <div key={review.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium break-all">{review.filename}</h4>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                <span className="text-sm text-muted-foreground">
                  {review.creditsUsed} {dictionary.molecules.recentReviews.creditsUsed}
                </span>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => reviewsPagination.handlePageChange(reviewsPagination.currentPage - 1)} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>{reviewsPagination.currentPage - 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>{reviewsPagination.currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>{reviewsPagination.currentPage + 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => reviewsPagination.handlePageChange(reviewsPagination.currentPage + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </Card>
  );
};
