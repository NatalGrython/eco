import { Address, Role } from "../common";

export interface User extends Address {
  email: string;
  id: number;
  imagePath: string;
  login: string;
  name: string;
  patronymic: string;
  role: Role;
  surname: string;
}
