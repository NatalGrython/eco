export interface IdEntity {
  id: number;
}

export interface Address {
  address?: string;
  entrance?: string;
  intercom?: string;
  flat?: string;
  floor?: string;
  comment?: string;
  phone?: string;
}

export type Role = "user" | "admin";

export type Status =
  | "InProgress"
  | "Assembled"
  | "AtTheCourier"
  | "Delivered"
  | "Canceled";
