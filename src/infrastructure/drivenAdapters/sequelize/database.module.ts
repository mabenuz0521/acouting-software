import { Module } from '@nestjs/common'
import { usersProviders } from 'src/domain/model/data/repository/providers/user.provider'
import { databaseProviders } from './database.providers'

@Module({
  providers: [...databaseProviders, ...usersProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
