import { AxiosError } from "axios";
import { CreateProductDto } from "../../types/forms/product";
import { ServerProduct } from "../../types/server/product";
import { apiAdapter } from "../adapter";
import { setFormData } from "../utils/form-data";

export const createProductApi = async (createData: CreateProductDto) => {
  try {
    const formData = setFormData(createData);
    const { data } = await apiAdapter.post<ServerProduct>(
      "/product",
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
