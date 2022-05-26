import { AxiosError } from "axios";
import { ServerFavorite } from "../../types/server/favorite";
import { apiAdapter } from "../adapter";

export const getFavoriteApi = async (favoriteId: number) => {
  try {
    const { data } = await apiAdapter.get<ServerFavorite>(
      `/favorite/${favoriteId}`
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
