import { createReducer } from "@reduxjs/toolkit";
import {
  authorizationCompleteAction,
  closeAction,
  openAction,
} from "./actions";

interface AuthState {
  token: null | string;
  modalIsOpen: boolean;
}

const initialState: AuthState = {
  token: null,
  modalIsOpen: false,
};

export const authReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(authorizationCompleteAction, (state, action) => {
      state.token = action.payload;
      state.modalIsOpen = false;
    })
    .addCase(openAction, (state) => {
      state.modalIsOpen = true;
    })
    .addCase(closeAction, (state) => {
      state.modalIsOpen = false;
    })
);
