import React from 'react';
import { Card } from '@/components/atoms/card';
import { RecentReviewsProps } from './RecentReviews.interface';

export const RecentReviews: React.FC<RecentReviewsProps> = ({ reviews }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>

      {reviews?.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          <p>No reviews yet</p>
          <p className="text-sm mt-1">Reviews will appear here once the bot has reviewed your PRs</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews?.map(review => (
            <div key={review.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{review.filename}</h4>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                <span className="text-sm text-muted-foreground">{review.creditsUsed} credits used</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
