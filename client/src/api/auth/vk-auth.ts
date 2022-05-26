import { AxiosError } from "axios";
import { VkAuthDto } from "../../types/forms/auth";
import { ServerAuth } from "../../types/server/auth";
import { apiAdapter } from "../adapter";

export const vkAuthApi = async (vkAuthDto: string) => {
  try {
    const { data } = await apiAdapter.post<ServerAuth>("/auth/vk", {
      code: vkAuthDto,
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
