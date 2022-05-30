import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from 'src/entities/catalog';
import { Repository } from 'typeorm';
import { createCatalogWithImageDto } from './dto/create-catalog.dto';
import { updateCatalogDto } from './dto/update-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog) private catalogRepository: Repository<Catalog>,
  ) {}

  getAllCatalogs() {
    return this.catalogRepository
      .createQueryBuilder('catalog')
      .leftJoinAndSelect('catalog.products', 'product')
      .select(['catalog', 'product.id'])
      .getMany();
  }

  getCatalogById(id: string) {
    return this.catalogRepository
      .createQueryBuilder('catalog')
      .leftJoinAndSelect('catalog.products', 'product')
      .where('catalog.id = :id', { id })
      .select(['catalog', 'product.id'])
      .getOne();
  }

  createCatalog(createCatalogDto: createCatalogWithImageDto) {
    return this.catalogRepository.save(createCatalogDto);
  }

  async updateCatalog(id: string, updateCatalogDto: updateCatalogDto) {
    await this.catalogRepository.update(id, {
      ...updateCatalogDto,
    });
    return this.getCatalogById(id);
  }
  async deleteCatalog(id: string) {
    const currentCatalog = await this.catalogRepository.findOne({
      where: { id },
    });

    await this.catalogRepository
      .createQueryBuilder('catalog')
      .where('id =: id', { id })
      .delete()
      .execute();

    return currentCatalog;
  }

  saveCatalog(catalog: Catalog) {
    return this.catalogRepository.save(catalog);
  }
}
