import { put, takeLatest } from "redux-saga/effects";
import { getUserApi, updateUserApi } from "../../api/user";
import { callTs } from "../../types/store";
import { getBasketAction } from "../basket/action";
import { getFavoriteAction } from "../favorite/action";
import { getOrdersAction } from "../order/actions";
import {
  getUserAction,
  getUserCompletedAction,
  getUserRejectedAction,
  updateUserCompletedAction,
  updateUserRejectedAction,
} from "./action";
import { GET_USER, UPDATE_USER } from "./constants";

function* getUser(action: ReturnType<typeof getUserAction>) {
  try {
    const responseUser = yield* callTs(getUserApi, action.payload);
    const { basket, favorite, ...user } = responseUser;
    yield put(
      getUserCompletedAction({
        ...user,
        email: user?.email ?? "",
        name: user.name ?? "",
        surname: user.surname ?? "",
        patronymic: user.patronymic ?? "",
      })
    );
    yield put(getBasketAction(basket.id));
    yield put(getFavoriteAction(favorite.id));
    yield put(getOrdersAction(user.id));
  } catch (error) {
    yield put(getUserRejectedAction());
  }
}

function* updateUser(action: any) {
  const { id, ...updatedData } = action.payload;
  try {
    const updatedUser = yield* callTs(updateUserApi, id, updatedData);
    yield put(
      updateUserCompletedAction({
        ...updatedUser,
        email: updatedUser?.email ?? "",
        name: updatedUser.name ?? "",
        surname: updatedUser.surname ?? "",
        patronymic: updatedUser.patronymic ?? "",
      })
    );
  } catch (error) {
    yield put(updateUserRejectedAction());
  }
}

export function* userWatcher() {
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(UPDATE_USER, updateUser);
}
