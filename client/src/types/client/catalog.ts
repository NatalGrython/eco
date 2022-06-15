import { IdEntity } from "../common";

export interface Catalog {
  id: number;
  imagePath: string;
  miniPath: string;
  name: string;
  products: IdEntity[];
}
