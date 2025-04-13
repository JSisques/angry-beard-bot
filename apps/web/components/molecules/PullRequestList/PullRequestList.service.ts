import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, put, del } from '@/lib/api';
import { PullRequest } from '@/types/PullRequest/PullRequest.type';

// Types

// React Query Hooks
export const usePullRequests = (supabaseId: string) => {
  return useQuery({
    queryKey: ['pullRequests', supabaseId],
    queryFn: () => getPullRequestsBySupabaseId(supabaseId),
    enabled: !!supabaseId,
  });
};

export const useCreatePullRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pullRequest: Omit<PullRequest, 'id'>) => createPullRequest(pullRequest),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['pullRequests'] });
    },
  });
};

export const useUpdatePullRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pullRequest: PullRequest) => updatePullRequest(pullRequest),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['pullRequests'] });
    },
  });
};

export const useDeletePullRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePullRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pullRequests'] });
    },
  });
};

// API Functions
export const getPullRequestById = async (id: string): Promise<PullRequest> => {
  return get<PullRequest>(`/pull-request/${id}`);
};

export const getPullRequestsBySupabaseId = async (supabaseId: string): Promise<PullRequest[]> => {
  return get<PullRequest[]>(`/pull-request/user/${supabaseId}`);
};

export const createPullRequest = async (pullRequest: Omit<PullRequest, 'id'>): Promise<PullRequest> => {
  return post<PullRequest>('/pull-request', pullRequest);
};

export const updatePullRequest = async (pullRequest: PullRequest): Promise<PullRequest> => {
  return put<PullRequest>(`/pull-request/${pullRequest.id}`, pullRequest);
};

export const deletePullRequest = async (id: string): Promise<void> => {
  return del(`/pull-request/${id}`);
};
