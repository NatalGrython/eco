import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogService } from 'src/catalog/catalog.service';
import { Product } from 'src/entities/product';
import { Repository } from 'typeorm';
import { createProductDtoWithImage } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private catalogService: CatalogService,
  ) {}

  getProductById(id: string) {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.catalog', 'catalog')
      .where('product.id = :id', { id })
      .select(['product', 'catalog.id'])
      .getOne();
  }

  getAllProducts() {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.catalog', 'catalog')
      .select(['product', 'catalog.id'])
      .getMany();
  }

  deleteProduct(id: string) {
    return this.productRepository.delete(Number(id));
  }

  async updateProduct(id: string, updateProductDto: updateProductDto) {
    const currentProduct = await this.getProductById(id);
    return this.productRepository.save({
      ...currentProduct,
      ...updateProductDto,
    });
  }

  async createProduct(createProductDto: createProductDtoWithImage) {
    const currentCatalog = await this.catalogService.getCatalogById(
      createProductDto.catalogId,
    );
    const product = this.productRepository.create({ ...createProductDto });

    currentCatalog.products.push(product);

    await this.catalogService.saveCatalog(currentCatalog);

    return this.getProductById(String(product.id));
  }
}
