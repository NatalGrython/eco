import { createReducer } from "@reduxjs/toolkit";
import {
  availabelAdminRoutes,
  availabelAuthRoutes,
  availabelDefaultRoutes,
} from "./actions";
import { initialRoutes } from "./initialState";
import { adminRoutes } from "./adminState";
import { authRoutes } from "./authState";

export const routesReducer = createReducer(
  { type: "default", routes: initialRoutes },
  (builder) =>
    builder
      .addCase(availabelAuthRoutes, () => ({
        type: "auth",
        routes: authRoutes,
      }))
      .addCase(availabelAdminRoutes, () => ({
        type: "admin",
        routes: adminRoutes,
      }))
      .addCase(availabelDefaultRoutes, () => ({
        type: "default",
        routes: initialRoutes,
      }))
);
