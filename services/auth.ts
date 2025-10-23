import { LoginResponse } from "@/types";
import { api } from "./api";

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await api.post<LoginResponse>("/login", {
      email,
      password,
    });
    return { data };
  } catch (error) {
    throw error;
  }
};
