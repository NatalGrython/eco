import { AxiosError } from "axios";
import { ServerFavorite } from "../../types/server/favorite";
import { apiAdapter } from "../adapter";

export const updateFavoriteApi = async (
  favoriteId: number,
  productIds: { id: number; deleting?: boolean }[]
) => {
  try {
    const updateData = {
      products: productIds.map((item) => ({
        productId: item.id,
        deleting: item.deleting,
      })),
    };
    const { data } = await apiAdapter.put<ServerFavorite>(
      `/favorite/${favoriteId}`,
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
