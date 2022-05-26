import { createAction } from "@reduxjs/toolkit";
import { Favorite } from "../../types/client/favorite";
import {
  GET_FAVORITE,
  GET_FAVORITE_REJECT,
  GET_FAVORITE_SUCCESS,
  UPDATE_FAVORITE,
  UPDATE_FAVORITE_REJECT,
  UPDATE_FAVORITE_SUCCESS,
} from "./constants";

export const updateFavoriteAction =
  createAction<{ id: number; deleting?: boolean }[]>(UPDATE_FAVORITE);
export const updateFavoriteSuccessAction = createAction<Favorite>(
  UPDATE_FAVORITE_SUCCESS
);
export const updateFavoriteRejectAction = createAction(UPDATE_FAVORITE_REJECT);

export const getFavoriteAction = createAction<number>(GET_FAVORITE);
export const getFavoriteSuccessAction =
  createAction<Favorite>(GET_FAVORITE_SUCCESS);
export const getFavoriteRejectAction = createAction(GET_FAVORITE_REJECT);
