import { createReducer } from "@reduxjs/toolkit";
import { Catalog } from "../../types/client/catalog";
import {
  createCatalogSuccessAction,
  deleteCatalogSuccessAction,
  getCatalogsSuccessAction,
  updateCatalogProductsSuccessAction,
  updateCatalogSuccessAction,
} from "./action";

interface CatalogState {
  catalogs: Catalog[];
}

const initialState: CatalogState = {
  catalogs: [],
};

export const catalogReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getCatalogsSuccessAction, (state, action) => {
      state.catalogs = action.payload;
    })
    .addCase(createCatalogSuccessAction, (state, action) => {
      state.catalogs.push(action.payload);
    })
    .addCase(updateCatalogSuccessAction, (state, action) => {
      state.catalogs = action.payload;
    })
    .addCase(updateCatalogProductsSuccessAction, (state, action) => {
      state.catalogs = action.payload;
    })
    .addCase(deleteCatalogSuccessAction, (state, action) => {
      state.catalogs = action.payload;
    })
);
