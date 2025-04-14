import { get } from '@/lib/api';

export const calculatePercentage = (remainingCredits: number, totalCredits: number): number => {
  return ((totalCredits - remainingCredits) / totalCredits) * 100;
};

export const getCreditsInfo = async (supabaseId: string): Promise<{ remainingCredits: number; totalCredits: number; usedCredits: number }> => {
  return get<{ remainingCredits: number; totalCredits: number; usedCredits: number }>(`/subscription/user/${supabaseId}/credits-info`);
};
