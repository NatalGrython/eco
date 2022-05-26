import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { updateFavoriteDto } from './dto/update-favorite.dto';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}
  @Put(':id')
  updateFavorite(
    @Param('id') id: string,
    @Body() updateFavoriteDto: updateFavoriteDto,
  ) {
    return this.favoriteService.updateFavorite(id, updateFavoriteDto);
  }

  @Get(':id')
  getFavorite(@Param('id') id: string) {
    return this.favoriteService.getFavorite(id);
  }
}
