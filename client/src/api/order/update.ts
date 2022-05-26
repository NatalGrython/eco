import { AxiosError } from "axios";
import { Status } from "../../types/common";
import { ServerOrder } from "../../types/server/orders";
import { apiAdapter } from "../adapter";

export const updateOrderApi = async (id: number, status: Status) => {
  try {
    const { data } = await apiAdapter.put<ServerOrder>(`/order/${id}`, {
      status,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
