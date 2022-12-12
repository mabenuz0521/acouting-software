import { Injectable, Inject } from '@nestjs/common'
import { CatalogRepository } from 'src/domain/model/data/repository/CatalogRespository'
import { ICatalog } from 'src/domain/model/data/CatalogModel'
import { CATALOG_REPOSITORY } from 'src/domain/model/config/constans'
import { Catalog } from '../entities/CatalogEntity'

@Injectable()
export class CatalogDatabaseRepository implements CatalogRepository {
  constructor(
    @Inject(CATALOG_REPOSITORY)
    private readonly catalogRepository: typeof Catalog
  ) {}

  async create(args: ICatalog): Promise<ICatalog> {
    return await this.catalogRepository.create<Catalog>(args)
  }

  async getById(id: number): Promise<ICatalog> {
    return await this.catalogRepository.findOne({
      where: {
        id
      },
      include: 'subCatalog'
    })
  }

  async getAll() {
    return await this.catalogRepository.findAll({
      where: {
        catalogId: null,
      },
      include: 'subCatalog'
    })
  }
}
