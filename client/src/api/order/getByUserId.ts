import { AxiosError } from "axios";
import { ServerOrder } from "../../types/server/orders";
import { apiAdapter } from "../adapter";

export const getOrderByUserIdApi = async (userId: number) => {
  try {
    const { data } = await apiAdapter.post<ServerOrder[]>(`/order`, { userId });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
