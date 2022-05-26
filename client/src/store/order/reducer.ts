import { createReducer } from "@reduxjs/toolkit";
import { Order } from "../../types/client/order";
import {
  closeOrdersModal,
  createOrderSuccessAction,
  deleteCurrentOrder,
  getOrdersSuccessAction,
  openOrderModal,
  setCurrentOrder,
  updateOrderSuccessAction,
} from "./actions";

interface OrderState {
  currentOrder: Partial<Order> | null;
  orders: Order[];
  openOrderModal: boolean;
}

const initialState: OrderState = {
  currentOrder: null,
  orders: [],
  openOrderModal: false,
};

export const ordersReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(openOrderModal, (state) => {
      state.openOrderModal = true;
    })
    .addCase(closeOrdersModal, (state) => {
      state.openOrderModal = false;
    })
    .addCase(setCurrentOrder, (state, action) => {
      state.currentOrder = action.payload;
    })
    .addCase(deleteCurrentOrder, (state) => {
      state.currentOrder = null;
    })
    .addCase(getOrdersSuccessAction, (state, action) => {
      state.orders = action.payload;
    })
    .addCase(createOrderSuccessAction, (state, action) => {
      state.orders.push(action.payload);
    })
    .addCase(updateOrderSuccessAction, (state, action) => {
      state.orders = action.payload;
    })
);
