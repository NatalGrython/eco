import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/entities/favorite';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), ProductModule],
  providers: [FavoriteService],
  exports: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
