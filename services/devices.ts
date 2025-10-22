import { Device, DevicesResponse } from '@/types';
import { api } from './api';

export const devicesService = {
  getDevices: async (
    limit: number = 5,
    offset: number = 0,
    search: string = '',
  ): Promise<DevicesResponse> => {
    const params: any = {
      limit,
      offset,
    };

    if (search) {
      params.search = search;
    }

    const response = await api.get('/devices', { params });
    return response.data;
  },

  getDeviceById: async (id: number): Promise<Device> => {
    const response = await api.get(`/devices/${id}`);
    return response.data;
  },
};
