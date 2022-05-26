import { IdEntity } from "../common";

export interface ServerBasketProduct {
  amount: number;
  product: IdEntity;
}

export interface ServerBasket {
  id: number;
  basketToProducts: ServerBasketProduct[];
}
