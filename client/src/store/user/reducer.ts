import { createReducer } from "@reduxjs/toolkit";
import { User } from "../../types/client/user";
import {
  deleteUser,
  getUserCompletedAction,
  updateUserCompletedAction,
} from "./action";

interface UserState {
  user: null | User;
}

const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getUserCompletedAction, (state, action) => {
      state.user = action.payload;
    })
    .addCase(deleteUser, (state) => {
      state.user = null;
    })
    .addCase(updateUserCompletedAction, (state, action) => {
      state.user = action.payload;
    })
);
