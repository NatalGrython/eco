import { AxiosError } from "axios";
import { ServerUser } from "../../types/server/user";
import { apiAdapter } from "../adapter";

export const getUserApi = async (userId: number) => {
  try {
    const { data } = await apiAdapter.get<ServerUser>(`/user/${userId}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
