interface UpdateProduct {
  productId: string;
  deleting?: boolean;
}

export class updateFavoriteDto {
  products: UpdateProduct[];
}
