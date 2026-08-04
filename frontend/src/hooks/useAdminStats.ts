import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export interface AdminStats {
  totalProjects: number;
  liveProjects: number;
  totalMessages: number;
  unreadMessages: number;
  adminUsers: number;
  totalGitHubRepos: number;
  totalGitHubStars: number;
}

export const useAdminStats = () => {
  return useQuery<AdminStats>({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const { data } = await api.get('/admin/stats');
      return data;
    },
  });
};
