import { Role } from "../common";

export interface Token {
  id: string;
  login: string;
  role: Role;
  iat: number;
  authType: "oauth" | "default";
}
