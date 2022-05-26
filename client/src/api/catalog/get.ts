import { AxiosError } from "axios";
import { ServerCatalog } from "../../types/server/catalog";
import { apiAdapter } from "../adapter";

export const getCatalogApi = async (catalogId: number) => {
  try {
    const { data } = await apiAdapter.get<ServerCatalog>(
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
