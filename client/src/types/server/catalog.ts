import { IdEntity } from "../common";

export interface ServerCatalog {
  id: number;
  imagePath: string;
  name: string;
  products: IdEntity[];
}
