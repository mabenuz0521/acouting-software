import { Module } from '@nestjs/common'
import { AuthResolver } from './AuthResolver'
import { AuthUseCases } from '../../domain/usecase/AuthUseCases'
import { FirebaseModule } from '../drivenAdapters/firebase/firebase.module'
import { UserUseCases } from 'src/domain/usecase/UserUseCases'
import { UserResolver } from './UserResolver'
import { SequelizeConfigModule } from '../drivenAdapters/sequelize/sequelize.module'

@Module({
  imports: [FirebaseModule, SequelizeConfigModule],
  providers: [AuthUseCases, AuthResolver, UserUseCases, UserResolver],
})
export class ResolversModule {}
