import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export interface Achievement {
  _id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  color?: string;
  badge?: string;
  year?: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Timeline {
  _id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
  color: string;
}

export interface Gallery {
  _id: string;
  src: string;
  title: string;
}

export interface Download {
  _id: string;
  name: string;
  description: string;
  size: string;
  type: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  badge?: string;
  badgeColor?: string;
  url: string;
  fileName: string;
  updatedAt: string;
}

export interface Statistic {
  _id: string;
  label: string;
  value: string;
  icon: string;
}

export const useAchievements = () => {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: async (): Promise<Achievement[]> => {
      const { data } = await api.get('/achievements');
      return data;
    },
  });
};

export const useFAQs = () => {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: async (): Promise<FAQ[]> => {
      const { data } = await api.get('/faqs');
      return data;
    },
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async (): Promise<Service[]> => {
      const { data } = await api.get('/services');
      return data;
    },
  });
};

export const useTimelines = () => {
  return useQuery({
    queryKey: ['timelines'],
    queryFn: async (): Promise<Timeline[]> => {
      const { data } = await api.get('/timelines');
      return data;
    },
  });
};

export const useGalleries = () => {
  return useQuery({
    queryKey: ['galleries'],
    queryFn: async (): Promise<Gallery[]> => {
      const { data } = await api.get('/galleries');
      return data;
    },
  });
};

export const useDownloads = () => {
  return useQuery({
    queryKey: ['downloads'],
    queryFn: async (): Promise<Download[]> => {
      const { data } = await api.get('/downloads');
      return data;
    },
  });
};

export const useStatistics = () => {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: async (): Promise<Statistic[]> => {
      const { data } = await api.get('/statistics');
      return data;
    },
  });
};
