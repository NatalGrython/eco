import { AxiosError } from "axios";
import { ServerBasket } from "../../types/server/basket";
import { apiAdapter } from "../adapter";

export const updateBasketApi = async (
  basketId: number,
  productIds: { id: number; amount: number }[]
) => {
  try {
    const updateData = {
      products: productIds.map((item) => ({
        productId: item.id,
        amount: item.amount,
      })),
    };
    const { data } = await apiAdapter.put<ServerBasket>(
      `/basket/${basketId}`,
      updateData
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
