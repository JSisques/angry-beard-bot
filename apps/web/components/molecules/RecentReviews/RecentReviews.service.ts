import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, del } from '@/lib/api';
import { Review } from '@/types/Review/Review.type';

/**
 * Hook to fetch reviews for a user
 * @param supabaseId - Supabase ID of the user
 * @param page - Page number for pagination
 * @returns {UseQueryResult} Query result containing reviews data
 */
export const useReviews = (supabaseId: string, page: number) => {
  return useQuery({
    queryKey: ['reviews', supabaseId, page],
    queryFn: () => getReviewsBySupabaseId(supabaseId, page),
    enabled: !!supabaseId,
  });
};

/**
 * Hook to create a new review
 * @returns {UseMutationResult} Mutation result for creating review
 */
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: Omit<Review, 'id'>) => createReview(review),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

/**
 * Hook to delete a review
 * @returns {UseMutationResult} Mutation result for deleting review
 */
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

/**
 * Fetches reviews for a specific user
 * @param supabaseId - Supabase ID of the user
 * @param page - Page number for pagination
 * @returns {Promise<Review[]>} Array of reviews
 */
export const getReviewsBySupabaseId = async (supabaseId: string, page: number): Promise<Review[]> => {
  return get<Review[]>(`/review/user/${supabaseId}?page=${page}`);
};

/**
 * Fetches reviews for a specific pull request
 * @param pullRequestId - ID of the pull request
 * @returns {Promise<Review[]>} Array of reviews
 */
export const getReviewsByPullRequestId = async (pullRequestId: string): Promise<Review[]> => {
  return get<Review[]>(`/review/pull-request/${pullRequestId}`);
};

/**
 * Creates a new review
 * @param review - Review data without ID
 * @returns {Promise<Review>} Created review
 */
export const createReview = async (review: Omit<Review, 'id'>): Promise<Review> => {
  return post<Review>('/review', review);
};

/**
 * Deletes a review
 * @param id - ID of the review to delete
 * @returns {Promise<void>}
 */
export const deleteReview = async (id: string): Promise<void> => {
  return del(`/review/${id}`);
};
