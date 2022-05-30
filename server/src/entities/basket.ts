import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasketToProduct } from './basket-to-product';
import { User } from './user';

@Entity('basket')
export class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.basket)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => BasketToProduct,
    (basketToProduct) => basketToProduct.basket,
    { cascade: true },
  )
  @JoinColumn()
  basketToProducts: BasketToProduct[];
}
