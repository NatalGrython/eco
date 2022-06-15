import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
    FileFieldsInterceptor([{ name: 'catalog' }, { name: 'mini' }], {
      storage: createStorage('./public/images/catalogs'),
    }),
  )
  createCatalog(
    @Body() createCatalogDto: createCatalogDto,
    @UploadedFiles()
    files: { catalog: Express.Multer.File[]; mini: Express.Multer.File[] },
  ) {
    return this.catalogService.createCatalog({
      ...createCatalogDto,
      imagePath: createPath(files.catalog[0].path),
      miniPath: createPath(files.mini[0].path),
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
