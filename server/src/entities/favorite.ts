import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product';
import { User } from './user';

@Entity('favorite')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.favorite)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Product, { cascade: true })
  @JoinTable()
  products: Product[];
}
