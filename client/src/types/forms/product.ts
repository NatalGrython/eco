export interface CreateProductDto {
  name: string;
  price: number;
  weight: number;
  description: string;
  storage: string;
  compound: string;
  calories: number;
  fats: number;
  proteins: number;
  carbohydrates: number;
  catalogId: number;
  product: File;
}

export type UpdateProductDto = Omit<Partial<CreateProductDto>, "catalogId"> & {
  productId: number;
};
