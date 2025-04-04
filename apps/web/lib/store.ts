import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Repository {
  id: string;
  name: string;
  owner: string;
  url: string;
}

interface BotConfig {
  grumpinessLevel: number;
  technicalLevel: number;
  detailLevel: number;
}

interface AppState {
  repositories: Repository[];
  botConfig: BotConfig;
  addRepository: (repo: Repository) => void;
  removeRepository: (id: string) => void;
  updateBotConfig: (config: Partial<BotConfig>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      repositories: [],
      botConfig: {
        grumpinessLevel: 50,
        technicalLevel: 50,
        detailLevel: 50,
      },
      addRepository: repo =>
        set(state => ({
          repositories: [...state.repositories, repo],
        })),
      removeRepository: id =>
        set(state => ({
          repositories: state.repositories.filter(repo => repo.id !== id),
        })),
      updateBotConfig: config =>
        set(state => ({
          botConfig: { ...state.botConfig, ...config },
        })),
    }),
    {
      name: 'angry-beard-storage',
    },
  ),
);
