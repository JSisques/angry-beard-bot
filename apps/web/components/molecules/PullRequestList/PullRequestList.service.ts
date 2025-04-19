import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, put, del } from '@/lib/api';
import { PullRequest } from '@/types/PullRequest/PullRequest.type';

/**
 * Gets unique pull request statuses from an array of pull requests
 * @param pullRequests - Array of pull requests
 * @returns {string[]} Array of unique status strings
 */
export const getUniquePullRequestStatuses = (pullRequests: PullRequest[] | undefined): string[] => {
  if (!pullRequests) return [];
  const statuses = new Set(pullRequests.map(pr => pr.status));
  return Array.from(statuses);
};

/**
 * Filters pull requests by status
 * @param pullRequests - Array of pull requests to filter
 * @param selectedStatus - Status to filter by
 * @returns {PullRequest[]} Filtered array of pull requests
 */
export const filterPullRequestsByStatus = (pullRequests: PullRequest[] | undefined, selectedStatus: string): PullRequest[] => {
  if (!pullRequests) return [];
  if (selectedStatus === 'all') return pullRequests;
  return pullRequests.filter(pr => pr.status === selectedStatus);
};

/**
 * Hook to fetch pull requests for a user
 * @param supabaseId - Supabase ID of the user
 * @param page - Page number for pagination
 * @returns {UseQueryResult} Query result containing pull requests data
 */
export const usePullRequests = (supabaseId: string, page: number = 1) => {
  return useQuery({
    queryKey: ['pullRequests', supabaseId, page],
    queryFn: () => getPullRequestsBySupabaseId(supabaseId, page),
    enabled: !!supabaseId,
  });
};

/**
 * Hook to create a new pull request
 * @returns {UseMutationResult} Mutation result for creating pull request
 */
export const useCreatePullRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pullRequest: Omit<PullRequest, 'id'>) => createPullRequest(pullRequest),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['pullRequests'] });
    },
  });
};

/**
 * Hook to update an existing pull request
 * @returns {UseMutationResult} Mutation result for updating pull request
 */
export const useUpdatePullRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pullRequest: PullRequest) => updatePullRequest(pullRequest),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['pullRequests'] });
    },
  });
};

/**
 * Hook to delete a pull request
 * @returns {UseMutationResult} Mutation result for deleting pull request
 */
export const useDeletePullRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePullRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pullRequests'] });
    },
  });
};

/**
 * Fetches a pull request by ID
 * @param id - ID of the pull request
 * @returns {Promise<PullRequest>} The requested pull request
 */
export const getPullRequestById = async (id: string): Promise<PullRequest> => {
  return get<PullRequest>(`/pull-request/${id}`);
};

/**
 * Fetches pull requests for a user
 * @param supabaseId - Supabase ID of the user
 * @param page - Page number for pagination
 * @returns {Promise<PullRequest[]>} Array of pull requests
 */
export const getPullRequestsBySupabaseId = async (supabaseId: string, page: number): Promise<PullRequest[]> => {
  return get<PullRequest[]>(`/pull-request/user/${supabaseId}?page=${page}`);
};

/**
 * Creates a new pull request
 * @param pullRequest - Pull request data without ID
 * @returns {Promise<PullRequest>} The created pull request
 */
export const createPullRequest = async (pullRequest: Omit<PullRequest, 'id'>): Promise<PullRequest> => {
  return post<PullRequest>('/pull-request', pullRequest);
};

/**
 * Updates an existing pull request
 * @param pullRequest - Updated pull request data
 * @returns {Promise<PullRequest>} The updated pull request
 */
export const updatePullRequest = async (pullRequest: PullRequest): Promise<PullRequest> => {
  return put<PullRequest>(`/pull-request/${pullRequest.id}`, pullRequest);
};

/**
 * Deletes a pull request
 * @param id - ID of the pull request to delete
 * @returns {Promise<void>}
 */
export const deletePullRequest = async (id: string): Promise<void> => {
  return del(`/pull-request/${id}`);
};
