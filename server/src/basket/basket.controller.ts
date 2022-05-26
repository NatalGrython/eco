import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { BasketService } from './basket.service';
import { UpdateBasketDto } from './dto/update-basket.dto';

@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Put(':id')
  updateBasket(
    @Param('id') id: string,
    @Body() updateBasketDto: UpdateBasketDto,
  ) {
    return this.basketService.updateBasket(id, updateBasketDto);
  }

  @Get(':id')
  getBasket(@Param('id') id: string) {
    return this.basketService.getBasket(id);
  }
}
