import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Basket } from './entities/basket';
import { Product } from './entities/product';
import { User } from './entities/user';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { Catalog } from './entities/catalog';
import { Favorite } from './entities/favorite';
import { Order } from './entities/order';
import { BasketToProduct } from './entities/basket-to-product';
import { OrderToProduct } from './entities/order-to-product';
import { BasketModule } from './basket/basket.module';
import { CatalogModule } from './catalog/catalog.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FavoriteModule } from './favorite/favorite.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: Number(process.env.PORT_DB),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_NAME_DB,
      synchronize: true,
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
    UserModule,
    ProductModule,
    BasketModule,
    CatalogModule,
    MulterModule.register(),
    // ServeStaticModule.forRoot({
    //   rootPath: './public',
    // }),
    FavoriteModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
