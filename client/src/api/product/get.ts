import { AxiosError } from "axios";
import { ServerProduct } from "../../types/server/product";
import { apiAdapter } from "../adapter";

export const getProductApi = async (productId: number) => {
  try {
    const { data } = await apiAdapter.get<ServerProduct>(
      `/product/${productId}`
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
