export class createCatalogDto {
  name: string;
}

export class createCatalogWithImageDto extends createCatalogDto {
  imagePath: string;
  miniPath: string;
}
