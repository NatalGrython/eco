import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Basket } from './basket';
import { Product } from './product';

@Entity()
export class BasketToProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => Basket, (basket) => basket.basketToProducts)
  basket: Basket;

  @ManyToOne(() => Product, (product) => product.basketToProducts, {
    cascade: true,
  })
  product: Product;
}
