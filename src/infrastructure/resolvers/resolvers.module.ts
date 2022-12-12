import { Module } from '@nestjs/common'
import { AuthResolver } from './AuthResolver'
import { AuthUseCases } from '../../domain/usecase/AuthUseCases'
import { FirebaseModule } from '../drivenAdapters/firebase/firebase.module'
import { UserUseCases } from 'src/domain/usecase/UserUseCases'
import { UserResolver } from './UserResolver'
import { CatalogUseCases } from 'src/domain/usecase/CatalogUseCases'
import { CatalogResolver } from './CatalogResolver'
import { SequelizeConfigModule } from '../drivenAdapters/sequelize/sequelize.module'
import { PlanResolver } from './PlanResolver'

@Module({
  imports: [FirebaseModule, SequelizeConfigModule],
  providers: [
    AuthUseCases,
    AuthResolver,
    UserUseCases,
    UserResolver,
    CatalogUseCases,
    CatalogResolver,
    PlanResolver
  ],
})
export class ResolversModule {}
