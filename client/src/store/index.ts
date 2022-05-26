import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { authReducer } from "./auth/reducer";
import { authSagaWatcher } from "./auth/saga";
import { basketReducer } from "./basket/reducer";
import { basketWatcher } from "./basket/saga";
import { catalogReducer } from "./catalog/reducer";
import { catalogWatcher } from "./catalog/saga";
import { favoriteReducer } from "./favorite/reducer";
import { favoriteWatcher } from "./favorite/saga";
import { ordersReducer } from "./order/reducer";
import { orderWatcher } from "./order/saga";
import { productReducer } from "./product/reducer";
import { productWatcher } from "./product/saga";
import { routesReducer } from "./routes/reducer";
import { userReducer } from "./user/reducer";
import { userWatcher } from "./user/saga";

function* rootSaga() {
  yield all([
    authSagaWatcher(),
    userWatcher(),
    catalogWatcher(),
    productWatcher(),
    favoriteWatcher(),
    basketWatcher(),
    orderWatcher(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    routes: routesReducer,
    auth: authReducer,
    user: userReducer,
    catalog: catalogReducer,
    product: productReducer,
    basket: basketReducer,
    favorite: favoriteReducer,
    order: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoreActions: true,
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
