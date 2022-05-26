import { AxiosError } from "axios";
import { ServerCatalog } from "../../types/server/catalog";
import { apiAdapter } from "../adapter";

export const getCatalogsApi = async () => {
  try {
    const { data } = await apiAdapter.get<ServerCatalog[]>("/catalog");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
