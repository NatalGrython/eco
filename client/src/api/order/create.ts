import { AxiosError } from "axios";
import { CreateOrderDto } from "../../types/forms/order";
import { ServerOrder } from "../../types/server/orders";
import { apiAdapter } from "../adapter";

export const createOrderApi = async (createOrderDto: CreateOrderDto) => {
  try {
    const createData = {
      ...createOrderDto,
      products: createOrderDto.products.map((item) => ({
        productId: item.product.id,
        amount: item.amount,
      })),
    };
    const { data } = await apiAdapter.post<ServerOrder>(
      `/order/create`,
      createData
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
