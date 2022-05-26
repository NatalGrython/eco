import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from 'src/entities/basket';
import { BasketToProduct } from 'src/entities/basket-to-product';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { UpdateBasketDto } from './dto/update-basket.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private basketRepository: Repository<Basket>,
    @InjectRepository(BasketToProduct)
    private basketToProductRepository: Repository<BasketToProduct>,
    private productService: ProductService,
  ) {}

  async createBasket() {
    const newBasket = this.basketRepository.create();
    return this.basketRepository.save(newBasket);
  }

  getBasket(id: string) {
    return this.basketRepository
      .createQueryBuilder('basket')
      .leftJoinAndSelect('basket.basketToProducts', 'basketToProduct')
      .leftJoinAndSelect('basketToProduct.product', 'product')
      .where('basket.id = :id', { id })
      .select(['basket', 'product.id', 'basketToProduct.amount'])
      .getOne();
  }

  findByUserId(id: string) {
    return this.basketRepository
      .createQueryBuilder('basket')
      .leftJoinAndSelect('basket.user', 'user')
      .leftJoinAndSelect('basket.basketToProducts', 'basketToProduct')
      .where('user.id = :id', { id })
      .getOne();
  }

  findById(id: string) {
    return this.basketRepository
      .createQueryBuilder('basket')
      .leftJoinAndSelect('basket.basketToProducts', 'basketToProduct')
      .leftJoinAndSelect('basketToProduct.product', 'product')
      .where('basket.id = :id', { id })
      .getOne();
  }

  async updateBasket(id: string, updateBasketDto: UpdateBasketDto) {
    try {
      const currentBasket = await this.findById(id);
      for (const { productId, amount } of updateBasketDto.products) {
        const product = await this.productService.getProductById(productId);
        const currentBasketToProduct = currentBasket.basketToProducts.find(
          (item) => item.product.id === Number(productId),
        );
        if (currentBasketToProduct) {
          if (amount > 0) {
            currentBasketToProduct.amount = amount;
            currentBasket.basketToProducts =
              currentBasket.basketToProducts.filter(
                (item) => item.id !== currentBasketToProduct.id,
              );
            currentBasket.basketToProducts.push(currentBasketToProduct);
          } else if (amount === 0) {
            currentBasket.basketToProducts =
              currentBasket.basketToProducts.filter(
                (item) => item.id !== currentBasketToProduct.id,
              );
            this.basketToProductRepository.remove(currentBasketToProduct);
          } else {
            currentBasketToProduct.amount = currentBasketToProduct.amount + 1;
            currentBasket.basketToProducts =
              currentBasket.basketToProducts.filter(
                (item) => item.id !== currentBasketToProduct.id,
              );
            currentBasket.basketToProducts.push(currentBasketToProduct);
          }
        } else {
          const basketToProduct = this.basketToProductRepository.create();
          basketToProduct.amount = 1;
          basketToProduct.product = product;
          currentBasket.basketToProducts.push(basketToProduct);
        }
      }
      return this.basketRepository.save(currentBasket);
    } catch (error) {
      console.log({ error });
    }
  }
}
