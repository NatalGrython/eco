import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderToProduct } from './order-to-product';
import { User } from './user';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  status: string;

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

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.order, {
    cascade: true,
  })
  orderToProduct: OrderToProduct[];

  @CreateDateColumn()
  timestamp: string;
}
