import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from 'src/entities/basket';
import { BasketToProduct } from 'src/entities/basket-to-product';
import { Catalog } from 'src/entities/catalog';
import { Favorite } from 'src/entities/favorite';
import { Order } from 'src/entities/order';
import { OrderToProduct } from 'src/entities/order-to-product';
import { Product } from 'src/entities/product';
import { User } from 'src/entities/user';
import { Seeder } from './seeder.service';
import { UserSeederModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: Number(process.env.PORT_DB),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_NAME_DB,
      synchronize: true,
      dropSchema: true,
      entities: [
        Order,
        OrderToProduct,
        BasketToProduct,
        User,
        Product,
        Basket,
        Catalog,
        Favorite,
      ],
    }),
    UserSeederModule,
  ],
  providers: [Seeder, Logger],
})
export class SeederModule {}
