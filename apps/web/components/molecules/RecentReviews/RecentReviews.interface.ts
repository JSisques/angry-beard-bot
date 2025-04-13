import { RootProps } from '@/interfaces/Root/Root.interface';
import { Review } from '@/types/Review/Review.type';

export interface RecentReviewsProps extends RootProps {
  reviews: Review[] | undefined;
}
