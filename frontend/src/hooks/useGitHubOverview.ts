import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export interface GitHubRepoOverview {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  homepage: string;
  updatedAt: string;
}

export interface GitHubOverview {
  totalPublicRepos: number;
  totalStars: number;
  totalForks: number;
  topRepos: GitHubRepoOverview[];
}

export const useGitHubOverview = () => {
  return useQuery<GitHubOverview>({
    queryKey: ['githubOverview'],
    queryFn: async () => {
      const { data } = await api.get('/github/overview');
      return data;
    },
  });
};
