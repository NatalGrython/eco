import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasketToProduct } from './basket-to-product';
import { Catalog } from './catalog';
import { Favorite } from './favorite';
import { OrderToProduct } from './order-to-product';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  weight: number;

  @Column()
  description: string;

  @Column()
  storage: string;

  @Column()
  compound: string;

  @Column({ type: 'float' })
  calories: number;

  @Column({ type: 'float' })
  fats: number;

  @Column({ type: 'float' })
  proteins: number;

  @Column({ type: 'float' })
  carbohydrates: number;

  @Column()
  imagePath: string;

  @ManyToOne(() => Catalog, (catalog) => catalog.products)
  @JoinColumn()
  catalog: Catalog;

  @ManyToMany(() => Favorite, (favorite) => favorite.products)
  favorites: Favorite[];

  @OneToMany(
    () => BasketToProduct,
    (basketToProduct) => basketToProduct.product,
  )
  @JoinColumn()
  basketToProducts: BasketToProduct[];

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.product)
  orderToProduct: OrderToProduct[];
}
