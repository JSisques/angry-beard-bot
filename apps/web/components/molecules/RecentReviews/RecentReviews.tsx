import React from 'react';
import { Card } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';

interface Review {
  id: string;
  repository: string;
  pullRequestTitle: string;
  pullRequestNumber: number;
  date: string;
  status: 'approved' | 'changes_requested' | 'commented';
  commentCount: number;
}

interface RecentReviewsProps {
  reviews: Review[];
}

export const RecentReviews: React.FC<RecentReviewsProps> = ({ reviews }) => {
  const getStatusBadge = (status: Review['status']) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'changes_requested':
        return <Badge className="bg-yellow-100 text-yellow-800">Changes Requested</Badge>;
      case 'commented':
        return <Badge className="bg-blue-100 text-blue-800">Commented</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>

      {reviews.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          <p>No reviews yet</p>
          <p className="text-sm mt-1">Reviews will appear here once the bot has reviewed your PRs</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{review.pullRequestTitle}</h4>
                  <p className="text-sm text-muted-foreground">
                    {review.repository} #{review.pullRequestNumber}
                  </p>
                </div>
                {getStatusBadge(review.status)}
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                <span className="text-sm text-muted-foreground">
                  {review.commentCount} {review.commentCount === 1 ? 'comment' : 'comments'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
