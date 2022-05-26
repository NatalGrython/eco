import { AxiosError } from "axios";
import { LoginDto } from "../../types/forms/auth";
import { ServerAuth } from "../../types/server/auth";
import { apiAdapter } from "../adapter";

export const loginApi = async (loginDto: LoginDto) => {
  try {
    const { data } = await apiAdapter.post<ServerAuth>("/auth/login", loginDto);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
