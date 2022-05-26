import { Address, Status } from "../common";
import { ServerBasketProduct } from "../server/basket";
import { ServerOrderUser } from "../server/orders";

export interface Order extends Address {
  id: number;
  products: ServerBasketProduct[];
  timestamp: string;
  status: Status;
  user: ServerOrderUser;
}
