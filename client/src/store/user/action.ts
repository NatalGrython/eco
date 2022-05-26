import { createAction } from "@reduxjs/toolkit";
import { User } from "../../types/client/user";
import { UpdateUserDto } from "../../types/forms/user";
import {
  DELETE_USER,
  GET_USER,
  GET_USER_COMPLETED,
  GET_USER_REJECTED,
  UPDATE_USER,
  UPDATE_USER_COMPLETED,
  UPDATE_USER_REJECTED,
} from "./constants";

export const getUserAction = createAction<number>(GET_USER);
export const getUserCompletedAction = createAction<User>(GET_USER_COMPLETED);
export const getUserRejectedAction = createAction(GET_USER_REJECTED);

export const updateUserAction = createAction<UpdateUserDto>(UPDATE_USER);
export const updateUserCompletedAction = createAction<User>(
  UPDATE_USER_COMPLETED
);
export const updateUserRejectedAction = createAction(UPDATE_USER_REJECTED);

export const deleteUser = createAction(DELETE_USER);
