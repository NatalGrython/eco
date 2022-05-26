import { Address } from "../common";
import { ServerOrderProduct } from "../server/orders";

export interface CreateOrderDto extends Address {
  userId: number;
  products: ServerOrderProduct[];
}
