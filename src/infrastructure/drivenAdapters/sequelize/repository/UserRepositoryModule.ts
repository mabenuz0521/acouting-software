import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigModule } from '../sequelize.module';
import { User } from 'src/domain/model/data/UserModel';
import { UserRepositoryImplement } from './UserRepositoryImplements';

@Module({
  imports: [SequelizeConfigModule, SequelizeModule.forFeature([User])],
  providers: [UserRepositoryImplement],
  exports: [UserRepositoryImplement],
})
export class RepositoryModule {}
