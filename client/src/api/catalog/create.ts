import { AxiosError } from "axios";
import { CreateCatalogDto } from "../../types/forms/catalog";
import { ServerCatalog } from "../../types/server/catalog";
import { apiAdapter } from "../adapter";
import { setFormData } from "../utils/form-data";

export const createCatalogApi = async (createData: CreateCatalogDto) => {
  try {
    const formData = setFormData(createData);
    const { data } = await apiAdapter.post<ServerCatalog>(
      "/catalog",
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
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
