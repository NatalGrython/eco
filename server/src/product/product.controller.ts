import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createStorage } from 'src/storage';
import { createPath } from 'src/storage/utils';
import { createProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('product', {
      storage: createStorage('./public/images/products'),
    }),
  )
  createProduct(
    @Body() createProductDto: createProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.createProduct({
      ...createProductDto,
      imagePath: createPath(file.path),
    });
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('product', {
      storage: createStorage('./public/images/products'),
    }),
  )
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: updateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      return this.productService.updateProduct(id, {
        ...updateProductDto,
        imagePath: createPath(file.path),
      });
    } else {
      return this.productService.updateProduct(id, {
        ...updateProductDto,
      });
    }
  }
}
