import { Module } from '@nestjs/common'
import { usersProviders } from 'src/domain/model/data/repository/providers/user.provider'
import { UserRepository } from '../../../domain/model/data/repository/UserRepository'
import { UserDatabaseRepository } from './UserDatabaseRepository'

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: UserDatabaseRepository,
    },
    ...usersProviders,
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: UserDatabaseRepository,
    },
  ],
})
export class SequelizeConfigModule {}
