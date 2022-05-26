import { AxiosError } from "axios";
import { ServerOrder } from "../../types/server/orders";
import { apiAdapter } from "../adapter";

export const getAllOrdersIdApi = async () => {
  try {
    const { data } = await apiAdapter.get<ServerOrder[]>(`/order`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
