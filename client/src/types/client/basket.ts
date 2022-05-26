import { ServerBasketProduct } from "../server/basket";

export interface Basket {
  id: number;
  products: ServerBasketProduct[];
}
