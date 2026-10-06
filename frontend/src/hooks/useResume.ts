import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data } = await api.get('/skills');
      return data;
    },
  });
};

export const useExperience = () => {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const { data } = await api.get('/experience');
      return data;
    },
  });
};

export const useEducation = () => {
  return useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const { data } = await api.get('/education');
      return data;
    },
  });
};
