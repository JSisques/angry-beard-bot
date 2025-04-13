import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, del } from '@/lib/api';
import { Review } from '@/types/Review/Review.type';

// Types

// React Query Hooks
export const useReviews = (supabaseId: string) => {
  return useQuery({
    queryKey: ['reviews', supabaseId],
    queryFn: () => getReviewsBySupabaseId(supabaseId),
    enabled: !!supabaseId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: Omit<Review, 'id'>) => createReview(review),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

// API Functions
export const getReviewsBySupabaseId = async (supabaseId: string): Promise<Review[]> => {
  return get<Review[]>(`/review/user/${supabaseId}`);
};

export const getReviewsByPullRequestId = async (pullRequestId: string): Promise<Review[]> => {
  return get<Review[]>(`/review/pull-request/${pullRequestId}`);
};

export const createReview = async (review: Omit<Review, 'id'>): Promise<Review> => {
  return post<Review>('/review', review);
};

export const deleteReview = async (id: string): Promise<void> => {
  return del(`/review/${id}`);
};
