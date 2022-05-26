import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JWTAdminGuard } from 'src/auth/jwt-admin-guard';
import { createStorage } from 'src/storage';
import { createPath } from 'src/storage/utils';
import { CatalogService } from './catalog.service';
import { createCatalogDto } from './dto/create-catalog.dto';
import { updateCatalogDto } from './dto/update-catalog.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Get()
  getAllCatalogs() {
    return this.catalogService.getAllCatalogs();
  }
  @Get(':id')
  getCatalogById(@Param('id') id: string) {
    return this.catalogService.getCatalogById(id);
  }

  @UseGuards(JWTAdminGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('catalog', {
      storage: createStorage('./public/images/catalogs'),
    }),
  )
  createCatalog(
    @Body() createCatalogDto: createCatalogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.catalogService.createCatalog({
      ...createCatalogDto,
      imagePath: createPath(file.path),
    });
  }

  @UseGuards(JWTAdminGuard)
  @Put(':id')
  updateCatalog(
    @Param('id') id: string,
    @Body() updateCatalogDto: updateCatalogDto,
  ) {
    return this.catalogService.updateCatalog(id, {
      ...updateCatalogDto,
    });
  }

  @UseGuards(JWTAdminGuard)
  @Delete(':id')
  deleteCatalog(@Param('id') id: string) {
    return this.catalogService.deleteCatalog(id);
  }
}
