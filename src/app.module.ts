import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { EnvironmentConfigModule } from './infrastructure/drivenAdapters/nestjs/environment-config/environment-config.module';
import { LoggerModule } from './infrastructure/drivenAdapters/nestjs/logger/logger.module';
import { ExceptionsModule } from './infrastructure/drivenAdapters/nestjs/exceptions/exceptions.module';
import { ResolversModule } from './infrastructure/resolvers/resolvers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/application/graphql.ts'),
        outputAs: 'class',
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
    }),
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    ResolversModule,
  ],
})
export class AppModule {}
