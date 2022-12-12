import { Injectable } from '@nestjs/common'
import { CatalogRepository } from '../model/data/repository/CatalogRespository'
import { ICatalog } from '../model/data/CatalogModel'

@Injectable()
export class CatalogUseCases {
  constructor(private catalogRespository: CatalogRepository) {}

  create(catalog: ICatalog) {
    return this.catalogRespository.create(catalog)
  }

  getAllCatalog() {
    return this.catalogRespository.getAll()
  }

  getCatalog(id: number) {
    return this.catalogRespository.getById(id)
  }
}
