interface Product {
  productId: string;
  amount: number;
}

export class CreateOrderDto {
  products: Product[];
  userId: number;
  address: string;
  entrance: string;
  intercom?: number;
  flat: number;
  floor: number;
  comment: string;
  phone: string;
}
