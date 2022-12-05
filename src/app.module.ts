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
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthModule } from 'nestjs-firebase-passport';
import { AuthStrategy } from './infrastructure/drivenAdapters/firebase/strategy/AuthStrategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './domain/model/data/UserModel';
@Module({
  imports: [
    FirebaseAuthModule.register({
      audience: process.env.FIREBASE_AUDIENCE,
      issuer: process.env.FIREBASE_ISSUER,
    }),
    PassportModule,
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
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'acoutting_software',
      models: [User],
    }),
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    ResolversModule,
  ],
  providers: [AuthStrategy],
})
export class AppModule {}
