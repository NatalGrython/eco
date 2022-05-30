import { AxiosError } from "axios";
import { ServerCatalog } from "../../types/server/catalog";
import { apiAdapter } from "../adapter";

export const deleteCatalogApi = async (catalogId: number) => {
  try {
    const { data } = await apiAdapter.delete<ServerCatalog>(
      `/catalog/${catalogId}`
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
