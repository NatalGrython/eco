import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Basket } from './basket';
import { Favorite } from './favorite';
import { Order } from './order';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  imagePath: string;

  @Column({ nullable: true, default: 'user' })
  role: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  entrance: string;

  @Column({ nullable: true })
  intercom: number;

  @Column({ nullable: true })
  flat: number;

  @Column({ nullable: true })
  floor: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  @JoinColumn()
  orders: Order[];

  @OneToOne(() => Basket, (basket) => basket.user, { cascade: true })
  @JoinColumn()
  basket: Basket;

  @OneToOne(() => Favorite, (favorite) => favorite.user, { cascade: true })
  @JoinColumn()
  favorite: Favorite;
}
