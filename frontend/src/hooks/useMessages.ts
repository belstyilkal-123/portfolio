import { useMutation } from '@tanstack/react-query';
import api from '../services/api';

interface MessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const useSendMessage = () => {
  return useMutation({
    mutationFn: async (messageData: MessageData) => {
      const { data } = await api.post('/messages', messageData);
      return data;
    },
  });
};
