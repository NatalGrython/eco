import { put, takeLatest, takeLeading } from "redux-saga/effects";
import {
  availabelAdminRoutes,
  availabelAuthRoutes,
  availabelDefaultRoutes,
} from "../routes/actions";
import { deleteUser, getUserAction } from "../user/action";
import {
  registrationStartedAction,
  loginStartedAction,
  authorizationCompleteAction,
  registrationRejectedAction,
  loginRejectedAction,
  vkAuthRejectedAction,
  vkAuthStartedAction,
} from "./actions";
import {
  CHECK_AUTHORIZATION,
  GOOGLE_AUTH__STARTED,
  LOGIN__STARTED,
  LOGOUT,
  REGISTRATION__STARTED,
  VK_AUTH__STARTED,
} from "./constants";
import jwtDecode from "jwt-decode";
import { callTs } from "../../types/store";
import { registrationApi, vkAuthApi, loginApi } from "../../api/auth";
import { Token } from "../../types/client/auth";
import { getOrdersAction } from "../order/actions";

function* authorizationSuccess(token: string) {
  localStorage.setItem("token", token);
  yield put(authorizationCompleteAction(token));
  const decoded = jwtDecode<Token>(token);
  if (decoded.role === "admin") {
    yield put(availabelAdminRoutes());
    //@ts-ignore
    yield put(getOrdersAction());
  } else {
    yield put(getUserAction(Number(decoded.id)));
    yield put(availabelAuthRoutes());
  }
}

function* registration(action: ReturnType<typeof registrationStartedAction>) {
  try {
    const { token } = yield* callTs(registrationApi, action.payload);
    yield* authorizationSuccess(token);
  } catch (error) {
    yield put(registrationRejectedAction());
  }
}

function* login(action: ReturnType<typeof loginStartedAction>) {
  try {
    const { token } = yield* callTs(loginApi, action.payload);
    yield* authorizationSuccess(token);
  } catch (error) {
    yield put(loginRejectedAction());
  }
}

function* vkAuth(action: ReturnType<typeof vkAuthStartedAction>) {
  try {
    const { token } = yield* callTs(vkAuthApi, action.payload);
    yield* authorizationSuccess(token);
  } catch (error) {
    yield put(vkAuthRejectedAction());
  }
}

function* googleAuth(action: any) {}

function* checkAuthorization() {
  const token = localStorage.getItem("token");
  if (token) {
    yield authorizationSuccess(token);
  }
}

function* logout() {
  localStorage.removeItem("token");
  yield put(availabelDefaultRoutes());
  yield put(deleteUser());
}

export function* authSagaWatcher() {
  yield takeLatest(LOGIN__STARTED, login);
  yield takeLatest(REGISTRATION__STARTED, registration);
  yield takeLeading(VK_AUTH__STARTED, vkAuth);
  yield takeLeading(GOOGLE_AUTH__STARTED, googleAuth);
  yield takeLatest(CHECK_AUTHORIZATION, checkAuthorization);
  yield takeLatest(LOGOUT, logout);
}
