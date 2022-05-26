import { AxiosError } from "axios";
import { UpdateUserDto } from "../../types/forms/user";
import { ServerUser } from "../../types/server/user";
import { apiAdapter } from "../adapter";
import { setFormData } from "../utils/form-data";

export const updateUserApi = async (id: number, updateData: UpdateUserDto) => {
  try {
    const formData = setFormData({
      ...updateData,
    });
    const { data } = await apiAdapter.put<ServerUser>(`/user/${id}`, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
