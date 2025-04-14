import { get } from '@/lib/api';

/**
 * Calculates the percentage of credits used
 * @param remainingCredits - Number of credits remaining
 * @param totalCredits - Total number of credits allocated
 * @returns {number} Percentage of credits used (0-100)
 */
export const calculatePercentage = (remainingCredits: number, totalCredits: number): number => {
  return ((totalCredits - remainingCredits) / totalCredits) * 100;
};

/**
 * Fetches credit usage information for a user
 * @param supabaseId - The Supabase ID of the user
 * @returns {Promise<{remainingCredits: number, totalCredits: number, usedCredits: number}>} Credit usage details
 */
export const getCreditsInfo = async (supabaseId: string): Promise<{ remainingCredits: number; totalCredits: number; usedCredits: number }> => {
  return get<{ remainingCredits: number; totalCredits: number; usedCredits: number }>(`/subscription/user/${supabaseId}/credits-info`);
};
