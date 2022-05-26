import { createReducer } from "@reduxjs/toolkit";
import { ServerBasketProduct } from "../../types/server/basket";
import {
  closeBasketAction,
  getBasketSuccessAction,
  openBasketAction,
  updateBasketSuccessAction,
} from "./action";

interface BasketState {
  products: ServerBasketProduct[];
  id?: number;
  basketOpened: boolean;
}

const initialState: BasketState = {
  products: [],
  basketOpened: false,
};

export const basketReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getBasketSuccessAction, (state, action) => {
      state.id = action.payload.id;
      state.products = action.payload.products;
    })
    .addCase(updateBasketSuccessAction, (state, action) => {
      state.id = action.payload.id;
      state.products = action.payload.products;
    })
    .addCase(openBasketAction, (state) => {
      state.basketOpened = true;
    })
    .addCase(closeBasketAction, (state) => {
      state.basketOpened = false;
    })
);
