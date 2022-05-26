import { put, takeEvery } from "redux-saga/effects";
import { getBasketApi } from "../../api/basket";
import { updateBasketApi } from "../../api/basket/update";
import { callTs, selectTs } from "../../types/store";
import {
  getBasketSuccessAction,
  getBasketRejectAction,
  updateBasketRejectAction,
  openBasketAction,
  updateBasketSuccessAction,
} from "./action";
import { GET_BASKET, UPDATE_BASKET } from "./constants";

function* updateBasket(action: any) {
  try {
    const basketId = yield* selectTs((state) => state.basket.id);
    if (basketId) {
      const basket = yield* callTs(updateBasketApi, basketId, action.payload);
      const currentBasket = {
        id: basket.id,
        products: basket.basketToProducts,
      };
      yield put(updateBasketSuccessAction(currentBasket));
      yield put(openBasketAction());
    }
  } catch (error) {
    yield put(updateBasketRejectAction());
  }
}

function* getBasket(action: any) {
  try {
    const basket = yield* callTs(getBasketApi, action.payload);
    const currentBasket = { id: basket.id, products: basket.basketToProducts };
    yield put(getBasketSuccessAction(currentBasket));
  } catch (error) {
    yield put(getBasketRejectAction());
  }
}

export function* basketWatcher() {
  yield takeEvery(UPDATE_BASKET, updateBasket);
  yield takeEvery(GET_BASKET, getBasket);
}
