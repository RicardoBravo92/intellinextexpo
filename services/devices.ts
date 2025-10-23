import { Device, DevicesResponse } from "@/types";
import { api } from "./api";

export const getDevicesByPage = async (
  page: number,
  limit: number = 20,
  search?: string,
): Promise<DevicesResponse[]> => {
  try {
    const { data } = await api.get<DevicesResponse[]>(
      `/devices?offset=${page * 10}&limit=${limit}&seerch=${search}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting Devices");
  }
};

//get by id
export const getDeviceById = async (id: number): Promise<Device> => {
  try {
    const { data } = await api.get<Device>(`/devices/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting Device");
  }
};
