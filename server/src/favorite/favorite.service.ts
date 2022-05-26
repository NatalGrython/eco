import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/entities/favorite';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { updateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    private productService: ProductService,
  ) {}

  async findByUserId(id: string) {
    const data = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.user', 'user')
      .leftJoinAndSelect('favorite.products', 'product')
      .where('user.id = :id', { id })
      .getOne();

    return data;
  }

  getFavorite(id: string) {
    return this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.products', 'product')
      .where('favorite.id = :id', { id })
      .select(['favorite', 'product.id'])
      .getOne();
  }

  findById(id: string) {
    return this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.products', 'product')
      .where('favorite.id = :id', { id })
      .getOne();
  }

  createFavorite() {
    const favorite = this.favoriteRepository.create();
    return this.favoriteRepository.save(favorite);
  }

  async updateFavorite(id: string, updateFavoriteDto: updateFavoriteDto) {
    const currentFavorite = await this.findById(id);
    for (const { productId, deleting } of updateFavoriteDto.products) {
      const product = await this.productService.getProductById(productId);
      if (deleting) {
        currentFavorite.products = currentFavorite.products.filter(
          (product) => product.id !== Number(productId),
        );
      } else {
        currentFavorite.products.push(product);
      }
    }
    return this.favoriteRepository.save(currentFavorite);
  }
}
