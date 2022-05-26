import axios from "axios";
import { setupInterceptors } from "./interceptors";

const api = axios.create({
  baseURL: `/api`,
});

export const apiAdapter = setupInterceptors(api);
