import { put, takeEvery } from "redux-saga/effects";
import { getFavoriteApi, updateFavoriteApi } from "../../api/favorite";
import { callTs, selectTs } from "../../types/store";
import { updateFavoriteProductAction } from "../product/action";
import {
  getFavoriteAction,
  getFavoriteRejectAction,
  getFavoriteSuccessAction,
  updateFavoriteRejectAction,
  updateFavoriteSuccessAction,
} from "./action";
import { GET_FAVORITE, UPDATE_FAVORITE } from "./constants";

function* updateFavorite(action: any) {
  try {
    const favoriteId = yield* selectTs((state) => state.favorite.id);

    if (favoriteId) {
      const newFavorite = yield* callTs(
        updateFavoriteApi,
        favoriteId,
        action.payload
      );

      yield put(updateFavoriteSuccessAction(newFavorite));
      yield put(updateFavoriteProductAction());
    }
  } catch (error) {
    yield put(updateFavoriteRejectAction());
  }
}

function* getFavorite(action: any) {
  try {
    const favorite = yield* callTs(getFavoriteApi, action.payload);
    yield put(getFavoriteSuccessAction(favorite));
    yield put(updateFavoriteProductAction());
  } catch (error) {
    yield put(getFavoriteRejectAction());
  }
}

export function* favoriteWatcher() {
  yield takeEvery(UPDATE_FAVORITE, updateFavorite);
  yield takeEvery(GET_FAVORITE, getFavorite);
}
