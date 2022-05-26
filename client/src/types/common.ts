export interface IdEntity {
  id: number;
}

export interface Address {
  address?: string;
  entrance?: string;
  intercom?: number;
  flat?: number;
  floor?: number;
  comment?: string;
}

export type Role = "user" | "admin";

export type Status =
  | "InProgress"
  | "Assembled"
  | "AtTheCourier"
  | "Delivered"
  | "Canceled";
