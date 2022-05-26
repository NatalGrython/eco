import { createReducer } from "@reduxjs/toolkit";
import { IdEntity } from "../../types/common";
import {
  getFavoriteSuccessAction,
  updateFavoriteSuccessAction,
} from "./action";

interface FavoriteState {
  products: IdEntity[];
  id?: number;
}

const initialState: FavoriteState = {
  products: [],
};

export const favoriteReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getFavoriteSuccessAction, (state, action) => {
      state.id = action.payload.id;
      state.products = action.payload.products;
    })
    .addCase(updateFavoriteSuccessAction, (state, action) => {
      state.id = action.payload.id;
      state.products = action.payload.products;
    })
);
