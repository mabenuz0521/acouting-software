import { Module } from '@nestjs/common';
import { AuthResolver } from './AuthResolver';
import { AuthUseCases } from '../../domain/usecase/AuthUseCases';
import { FirebaseModule } from '../drivenAdapters/firebase/firebase.module';
import { User } from 'src/domain/model/data/UserModel';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserUseCases } from 'src/domain/usecase/UserUseCases';
import { UserResolver } from './UserResolver';
import { SequelizeConfigModule } from '../drivenAdapters/sequelize/sequelize.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    FirebaseModule,
    SequelizeConfigModule
  ],
  providers: [AuthUseCases, AuthResolver , UserUseCases, UserResolver],
})
export class ResolversModule {}
