interface UpdateProduct {
  productId: string;
  amount?: number;
  deleting?: boolean;
}

export class UpdateBasketDto {
  products: UpdateProduct[];
}
