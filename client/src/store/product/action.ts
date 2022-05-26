import { createAction } from "@reduxjs/toolkit";
import { Product } from "../../types/client/product";
import { CreateProductDto, UpdateProductDto } from "../../types/forms/product";
import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_REJECT,
  CREATE_PRODUCT_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_REJECT,
  GET_PRODUCTS_SUCCESS,
  UPDATE_FAVORITE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_REJECT,
  UPDATE_PRODUCT_SUCCESS,
} from "./constants";

export const createProductAction =
  createAction<CreateProductDto>(CREATE_PRODUCT);
export const createProductSuccessAction = createAction<Product>(
  CREATE_PRODUCT_SUCCESS
);
export const createProductRejectAction = createAction(CREATE_PRODUCT_REJECT);

export const updateProductAction =
  createAction<UpdateProductDto>(UPDATE_PRODUCT);
export const updateProductSuccessAction = createAction<Product[]>(
  UPDATE_PRODUCT_SUCCESS
);
export const updateProductRejectAction = createAction(UPDATE_PRODUCT_REJECT);

export const getProductsAction = createAction(GET_PRODUCTS);
export const getProductsSuccessAction =
  createAction<Product[]>(GET_PRODUCTS_SUCCESS);
export const getProductsRejectAction = createAction(GET_PRODUCTS_REJECT);

export const updateFavoriteProductAction = createAction(
  UPDATE_FAVORITE_PRODUCT
);
