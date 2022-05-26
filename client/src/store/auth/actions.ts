import { createAction } from "@reduxjs/toolkit";
import { LoginDto, RegistrationDto, VkAuthDto } from "../../types/forms/auth";
import {
  AUTHORIZATION__COMPLETE,
  AUTH_MODAL_CLOSE,
  AUTH_MODAL_OPEN,
  CHECK_AUTHORIZATION,
  GOOGLE_AUTH__REJECTED,
  GOOGLE_AUTH__STARTED,
  LOGIN__REJECTED,
  LOGIN__STARTED,
  LOGOUT,
  REGISTRATION__REJECTED,
  REGISTRATION__STARTED,
  VK_AUTH__REJECTED,
  VK_AUTH__STARTED,
} from "./constants";

export const registrationStartedAction = createAction<RegistrationDto>(
  REGISTRATION__STARTED
);
export const registrationRejectedAction = createAction(REGISTRATION__REJECTED);

export const loginStartedAction = createAction<LoginDto>(LOGIN__STARTED);
export const loginRejectedAction = createAction(LOGIN__REJECTED);

export const vkAuthStartedAction = createAction<string>(VK_AUTH__STARTED);
export const vkAuthRejectedAction = createAction(VK_AUTH__REJECTED);

export const googleAuthnStartedAction = createAction(GOOGLE_AUTH__STARTED);
export const googleAuthnRejectedAction = createAction(GOOGLE_AUTH__REJECTED);

export const checkAuthorizationAction = createAction(CHECK_AUTHORIZATION);

export const authorizationCompleteAction = createAction<string>(
  AUTHORIZATION__COMPLETE
);

export const logoutAction = createAction(LOGOUT);

export const openAction = createAction(AUTH_MODAL_OPEN);
export const closeAction = createAction(AUTH_MODAL_CLOSE);
