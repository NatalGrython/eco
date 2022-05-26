import { AxiosError } from "axios";
import { UpdateProductDto } from "../../types/forms/product";
import { ServerProduct } from "../../types/server/product";
import { apiAdapter } from "../adapter";

export const updateProductApi = async (
  productId: number,
  updateData: UpdateProductDto
) => {
  try {
    const { data } = await apiAdapter.put<ServerProduct>(
      `/product/${productId}`,
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
