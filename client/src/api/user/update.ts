import { AxiosError } from "axios";
import { UpdateUserDto } from "../../types/forms/user";
import { ServerUser } from "../../types/server/user";
import { apiAdapter } from "../adapter";
import { setFormData } from "../utils/form-data";

export const updateUserApi = async (id: number, updateData: UpdateUserDto) => {
  try {
    const fileExist = !!Object.values(updateData).find(
      (item) => item instanceof File
    );

    let dataForm: any = updateData;

    if (fileExist) {
      dataForm = setFormData({
        ...updateData,
      });
    }
    const { data } = await apiAdapter.put<ServerUser>(`/user/${id}`, dataForm, {
      headers: fileExist
        ? {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          }
        : undefined,
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
