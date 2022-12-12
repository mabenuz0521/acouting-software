import { Module } from '@nestjs/common'
import { usersProviders } from 'src/domain/model/data/repository/providers/user.provider'
import { UserRepository } from '../../../domain/model/data/repository/UserRepository'
import { UserSqlRepository } from './implements/UserSqlRepository'
import { CatalogSqlRepository } from './implements/CatalogSqlRepository'
import { catalogProviders } from 'src/domain/model/data/repository/providers/catalog.provider'
import { CatalogRepository } from '../../../domain/model/data/repository/CatalogRespository'

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: UserSqlRepository,
    },
    {
      provide: CatalogRepository,
      useClass: CatalogSqlRepository,
    },
    ...usersProviders,
    ...catalogProviders,
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: UserSqlRepository,
    },
    {
      provide: CatalogRepository,
      useClass: CatalogSqlRepository,
    },
  ],
})
export class SequelizeConfigModule {}
