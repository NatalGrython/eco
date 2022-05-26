import { createReducer } from "@reduxjs/toolkit";
import { Product } from "../../types/client/product";
import {
  createProductSuccessAction,
  getProductsSuccessAction,
  updateProductSuccessAction,
} from "./action";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const productReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getProductsSuccessAction, (state, action) => {
      state.products = action.payload;
    })
    .addCase(createProductSuccessAction, (state, action) => {
      state.products.push(action.payload);
    })
    .addCase(updateProductSuccessAction, (state, action) => {
      state.products = action.payload;
    })
);
