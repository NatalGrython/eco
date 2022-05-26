import { createAction } from "@reduxjs/toolkit";
import { Basket } from "../../types/client/basket";
import {
  CLOSE_BASKET,
  GET_BASKET,
  GET_BASKET_REJECT,
  GET_BASKET_SUCCESS,
  OPEN_BASKET,
  UPDATE_BASKET,
  UPDATE_BASKET_REJECT,
  UPDATE_BASKET_SUCCESS,
} from "./constants";

export const updateBasketAction =
  createAction<{ id: number; amount?: number }[]>(UPDATE_BASKET);
export const updateBasketSuccessAction = createAction<Basket>(
  UPDATE_BASKET_SUCCESS
);
export const updateBasketRejectAction = createAction(UPDATE_BASKET_REJECT);

export const getBasketAction = createAction<number>(GET_BASKET);
export const getBasketSuccessAction = createAction<Basket>(GET_BASKET_SUCCESS);
export const getBasketRejectAction = createAction(GET_BASKET_REJECT);

export const openBasketAction = createAction(OPEN_BASKET);
export const closeBasketAction = createAction(CLOSE_BASKET);
