import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export interface Project {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      const { data } = await api.get('/projects');
      return data;
    },
  });
};
