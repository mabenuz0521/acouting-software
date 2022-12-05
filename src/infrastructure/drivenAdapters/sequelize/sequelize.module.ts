import { Module } from '@nestjs/common';
import { UserRepository } from '../../../domain/model/data/repository/UserRepository';
import { UserDatabaseRepository } from './UserDatabaseRepository';

@Module({
  providers:[
    {
      provide: UserRepository,
      useClass: UserDatabaseRepository
    }
  ],
  exports:[
     {
      provide: UserRepository,
      useClass: UserDatabaseRepository
     }
  ]
})
export class SequelizeConfigModule {}
