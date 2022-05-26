import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order';
import { Product } from './product';

@Entity()
export class OrderToProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => Order, (order) => order.orderToProduct)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderToProduct)
  product: Product;
}
