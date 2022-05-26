import { createAction } from "@reduxjs/toolkit";
import { Order } from "../../types/client/order";
import { Status } from "../../types/common";
import {
  CHECKOUT_ORDER,
  CLOSE_CREATE_ORDER_MODAL,
  CREATE_ORDER,
  CREATE_ORDER_REJECT,
  CREATE_ORDER_SUCCESS,
  DELETE_CURRENT_ORDER,
  GET_ORDERS,
  GET_ORDERS_REJECT,
  GET_ORDERS_SUCCESS,
  OPEN_CREATE_ORDER_MODAL,
  SET_CURRENT_ORDER,
  UPDATE_ORDER,
  UPDATE_ORDER_REJECT,
  UPDATE_ORDER_SUCCESS,
} from "./constants";

export const openOrderModal = createAction(OPEN_CREATE_ORDER_MODAL);
export const closeOrdersModal = createAction(CLOSE_CREATE_ORDER_MODAL);

export const setCurrentOrder = createAction<Partial<Order>>(SET_CURRENT_ORDER);
export const deleteCurrentOrder = createAction(DELETE_CURRENT_ORDER);

export const checkoutOrder = createAction(CHECKOUT_ORDER);

export const createOrderAction = createAction(CREATE_ORDER);
export const createOrderSuccessAction =
  createAction<Order>(CREATE_ORDER_SUCCESS);
export const createOrderRejectAction = createAction(CREATE_ORDER_REJECT);

export const getOrdersAction = createAction<number>(GET_ORDERS);
export const getOrdersSuccessAction = createAction<Order[]>(GET_ORDERS_SUCCESS);
export const getOrdersRejectAction = createAction(GET_ORDERS_REJECT);

export const updateOrderAction = createAction<{ id: number; status: Status }>(
  UPDATE_ORDER
);
export const updateOrderSuccessAction =
  createAction<Order[]>(UPDATE_ORDER_SUCCESS);
export const updateOrderRejectAction = createAction(UPDATE_ORDER_REJECT);
