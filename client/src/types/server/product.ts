import { IdEntity } from "../common";

export interface ServerProduct {
  calories: number;
  carbohydrates: number;
  catalog: IdEntity;
  compound: string;
  description: string;
  fats: number;
  id: number;
  imagePath: string;
  name: string;
  price: number;
  proteins: number;
  storage: string;
  weight: number;
}
