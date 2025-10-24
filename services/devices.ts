import { DeviceResponse, DevicesResponse } from "@/types";
import { api } from "./api";

export const getDevicesByPage = async (
  offset: number,
  limit: number = 20,
  search?: string,
): Promise<DevicesResponse> => {
  try {
    const { data } = await api.get<DevicesResponse>(
      `/devices?offset=${offset}&limit=${limit}&search=${search}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting Devices");
  }
};

export const getDeviceById = async (id: number): Promise<DeviceResponse> => {
  try {
    const { data } = await api.get<DeviceResponse>(`/devices/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting Device");
  }
};
