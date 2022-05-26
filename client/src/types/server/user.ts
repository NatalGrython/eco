import { Address, IdEntity, Role } from "../common";

export interface ServerUser extends Address {
  basket: IdEntity;
  email: string | null;
  favorite: IdEntity;
  id: number;
  imagePath: string;
  login: string;
  name: string | null;
  patronymic: string | null;
  role: Role;
  surname: string | null;
}
