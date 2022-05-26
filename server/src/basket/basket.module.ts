import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from 'src/entities/basket';
import { BasketToProduct } from 'src/entities/basket-to-product';
import { ProductModule } from 'src/product/product.module';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Basket, BasketToProduct]), ProductModule],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
