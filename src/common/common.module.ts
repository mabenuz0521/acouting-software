import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { SequelizeConfigModule } from './infrastructure/config/sequelize/sequelize.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';

@Module({
    imports: [
        EnvironmentConfigModule,
        SequelizeConfigModule,
        LoggerModule,
        ExceptionsModule,
    ]
})
export class CommonModule {}
