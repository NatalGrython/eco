import { IdEntity } from "../common";

export interface ServerCatalog {
  id: number;
  imagePath: string;
  miniPath: string;
  name: string;
  products: IdEntity[];
}
