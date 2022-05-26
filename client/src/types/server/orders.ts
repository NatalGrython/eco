import { Address, IdEntity, Status } from "../common";

export interface ServerOrderProduct {
  amount: number;
  product: IdEntity;
}

export interface ServerOrderUser {
  email: string | null;
  login: string;
  name: string;
  patronymic: string | null;
  surname: string | null;
}

export interface ServerOrder extends Address {
  id: number;
  orderToProduct: ServerOrderProduct[];
  status: Status;
  timestamp: string;
  user: ServerOrderUser;
}
