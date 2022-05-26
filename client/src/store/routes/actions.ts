import { createAction } from "@reduxjs/toolkit";
import {
  AVAILABEL_AUTH_ROUTES,
  AVAILABEL_ADMIN_ROUTES,
  AVAILABEL_DEFAULT_ROUTES
} from "./constants";

export const availabelAuthRoutes = createAction(AVAILABEL_AUTH_ROUTES);
export const availabelAdminRoutes = createAction(AVAILABEL_ADMIN_ROUTES);
export const availabelDefaultRoutes = createAction(AVAILABEL_DEFAULT_ROUTES);
