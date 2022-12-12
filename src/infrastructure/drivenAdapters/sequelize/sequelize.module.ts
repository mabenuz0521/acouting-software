import { Module } from '@nestjs/common'
import { usersProviders } from 'src/domain/model/data/repository/providers/user.provider'
import { UserRepository } from '../../../domain/model/data/repository/UserRepository'
import { UserDatabaseRepository } from './implements/UserDatabaseRepository'
import { CatalogDatabaseRepository } from './implements/CatalogDatabaseRepository'
import { catalogProviders } from 'src/domain/model/data/repository/providers/catalog.provider'
import { CatalogRepository } from '../../../domain/model/data/repository/CatalogRespository'

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: UserDatabaseRepository,
    },
    {
      provide: CatalogRepository,
      useClass: CatalogDatabaseRepository,
    },
    ...usersProviders,
    ...catalogProviders,
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: UserDatabaseRepository,
    },
    {
      provide: CatalogRepository,
      useClass: CatalogDatabaseRepository,
    },
  ],
})
export class SequelizeConfigModule {}
