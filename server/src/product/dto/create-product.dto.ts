export class createProductDto {
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

  catalogId: string;
}

export class createProductDtoWithImage extends createProductDto {
  imagePath: string;
}
