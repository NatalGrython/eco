import { AxiosError } from "axios";
import { UpdateCatalogDto } from "../../types/forms/catalog";
import { ServerCatalog } from "../../types/server/catalog";
import { apiAdapter } from "../adapter";

export const updateCatalogApi = async (
  id: number,
  updateData: UpdateCatalogDto
) => {
  try {
    const { data } = await apiAdapter.put<ServerCatalog>(
      `/catalog/${id}`,
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
