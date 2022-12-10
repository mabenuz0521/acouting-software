import { Catalog } from 'src/infrastructure/drivenAdapters/sequelize/entities/CatalogEntity'
import { CATALOG_REPOSITORY } from 'src/domain/model/config/constans'

export const catalogProviders = [
  {
    provide: CATALOG_REPOSITORY,
    useValue: Catalog,
  },
]
