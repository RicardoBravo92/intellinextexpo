import { LoginResponse } from '@/types';
import { api } from './api';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/login', {
      email,
      password,
    });
    return response.data;
  },
};
