import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product';

@Entity('catalog')
export class Catalog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imagePath: string;

  @OneToMany(() => Product, (product) => product.catalog, {
    cascade: true,
  })
  @JoinColumn()
  products: Product[];
}
