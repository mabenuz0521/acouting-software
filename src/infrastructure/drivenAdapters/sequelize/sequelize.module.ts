import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from 'src/domain/model/data/UserModel';
import { EnvironmentConfigService } from '../nestjs/environment-config/environment-config.service';

export const getSequelizeModuleOptions = (
  config: EnvironmentConfigService,
): SequelizeModuleOptions =>
  ({
    dialect: 'mysql',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    models: [User],
  } as SequelizeConfigModule);

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [EnvironmentConfigService],
      inject: [EnvironmentConfigService],
      useFactory: getSequelizeModuleOptions,
    }),
  ],
})
export class SequelizeConfigModule {}
