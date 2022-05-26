import { AxiosError } from "axios";
import { RegistrationDto } from "../../types/forms/auth";
import { ServerAuth } from "../../types/server/auth";
import { apiAdapter } from "../adapter";

export const registrationApi = async (registrationDto: RegistrationDto) => {
  try {
    const { data } = await apiAdapter.post<ServerAuth>(
      "/auth/registration",
      registrationDto
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
