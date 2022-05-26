export interface CreateCatalogDto {
  name: string;
  catalog: File;
}

export interface UpdateCatalogDto {
  name: string;
  id: number;
}
