import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  createOrderApi,
  getAllOrdersIdApi,
  getOrderByUserIdApi,
} from "../../api/order";
import { updateOrderApi } from "../../api/order/update";
import { Token } from "../../types/client/auth";
import { callTs, selectTs } from "../../types/store";
import { closeBasketAction, updateBasketAction } from "../basket/action";
import {
  closeOrdersModal,
  createOrderRejectAction,
  createOrderSuccessAction,
  deleteCurrentOrder,
  getOrdersRejectAction,
  getOrdersSuccessAction,
  openOrderModal,
  setCurrentOrder,
  updateOrderRejectAction,
  updateOrderSuccessAction,
} from "./actions";
import {
  CHECKOUT_ORDER,
  CREATE_ORDER,
  GET_ORDERS,
  UPDATE_ORDER,
} from "./constants";

function* checkoutOrder() {
  const basket = yield* selectTs((state) => state.basket);
  yield put(closeBasketAction());
  yield put(openOrderModal());
  yield put(setCurrentOrder({ products: basket.products }));
}

function* createOrder(action: any) {
  try {
    const address = action.payload;
    const order = yield* selectTs((state) => state.order.currentOrder);
    const user = yield* selectTs((state) => state.user.user);
    if (order && user) {
      const newOrder = yield* callTs(createOrderApi, {
        ...order,
        ...address,
        userId: user.id,
      });

      yield put(
        createOrderSuccessAction({
          ...newOrder,
          products: newOrder.orderToProduct,
        })
      );
      yield put(closeOrdersModal());
      yield put(deleteCurrentOrder());
      const basket = yield* selectTs((state) => state.basket);

      yield put(
        updateBasketAction(
          basket.products.map((item) => ({ id: item.product.id, amount: 0 }))
        )
      );
      yield put(closeBasketAction());
      yield* callTs(toast, "Заказ успешно создан", {
        type: "success",
      });
      yield put(closeBasketAction());
    }
  } catch (error) {
    yield put(createOrderRejectAction());
  }
}

function* getOrders() {
  try {
    const user = yield* selectTs((state) => state.user.user);
    const token = yield* selectTs((state) => state.auth.token);
    if (token) {
      const decoded = jwtDecode<Token>(token);
      if (user && decoded.role === "user") {
        const orders = yield* callTs(getOrderByUserIdApi, user.id);
        yield put(
          getOrdersSuccessAction(
            orders.map((order) => ({
              id: order.id,
              status: order.status,
              timestamp: order.timestamp,
              products: order.orderToProduct,
              address: order.address,
              user: order.user,
            }))
          )
        );
      } else if (decoded.role === "admin") {
        const orders = yield* callTs(getAllOrdersIdApi);
        yield put(
          getOrdersSuccessAction(
            orders.map((order) => ({
              products: order.orderToProduct,
              ...order,
            }))
          )
        );
      }
    }
  } catch (error) {
    yield put(getOrdersRejectAction());
  }
}

function* updateOrder(action: any) {
  try {
    const { id, status } = action.payload;
    const updatedOrder = yield* callTs(updateOrderApi, id, status);
    const orders = yield* selectTs((state) => state.order.orders);
    const newOrders = orders.map((order) => {
      if (order.id === updatedOrder.id) {
        return {
          ...updatedOrder,
          products: updatedOrder.orderToProduct,
        };
      }
      return order;
    });
    yield put(updateOrderSuccessAction(newOrders));
  } catch (error) {
    yield put(updateOrderRejectAction());
  }
}

export function* orderWatcher() {
  yield takeEvery(CHECKOUT_ORDER, checkoutOrder);
  yield takeEvery(CREATE_ORDER, createOrder);
  yield takeEvery(GET_ORDERS, getOrders);
  yield takeEvery(UPDATE_ORDER, updateOrder);
}
