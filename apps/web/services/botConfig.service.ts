import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, put, del } from '@/lib/api';
import { BotConfig } from '@/types/BotConfig/BotConfig.type';

// Types

// React Query Hooks
export const useBotConfig = (userId: string) => {
  return useQuery({
    queryKey: ['botConfig', userId],
    queryFn: () => getBotConfigBySupabaseId(userId),
    enabled: !!userId,
  });
};

export const useUpdateBotConfig = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (config: Partial<BotConfig> & { id: string }) => updateBotConfig(config),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['botConfig', userId] });
    },
  });
};

export const useCreateBotConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (config: Omit<BotConfig, 'id'>) => createBotConfig(config),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['botConfig', data.userId] });
    },
  });
};

export const useDeleteBotConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBotConfig(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['botConfig'] });
    },
  });
};

// API Functions
export const getBotConfigByUserId = async (userId: string): Promise<BotConfig> => {
  return get<BotConfig>(`/bot-config/user/${userId}`);
};

export const getBotConfigBySupabaseId = async (supabaseId: string): Promise<BotConfig> => {
  return get<BotConfig>(`/bot-config/supabase/${supabaseId}`);
};

export const createBotConfig = async (config: Omit<BotConfig, 'id'>): Promise<BotConfig> => {
  return post<BotConfig>(`/bot-config/${config.userId}`, config);
};

export const updateBotConfig = async (config: Partial<BotConfig> & { id: string }): Promise<BotConfig> => {
  return put<BotConfig>(`/bot-config/${config.id}`, config);
};

export const deleteBotConfig = async (id: string): Promise<void> => {
  return del(`/bot-config/${id}`);
};
