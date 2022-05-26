import { IdEntity } from "../common";

export interface Catalog {
  id: number;
  imagePath: string;
  name: string;
  products: IdEntity[];
}
