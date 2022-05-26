import { AxiosError } from "axios";
import { ServerBasket } from "../../types/server/basket";
import { apiAdapter } from "../adapter";

export const getBasketApi = async (basketId: number) => {
  try {
    const { data } = await apiAdapter.get<ServerBasket>(`/basket/${basketId}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
