import { join } from 'path'
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { LoggerModule } from './infrastructure/drivenAdapters/nestjs/logger/logger.module';
import { ExceptionsModule } from './infrastructure/drivenAdapters/nestjs/exceptions/exceptions.module';
import { ResolversModule } from './infrastructure/resolvers/resolvers.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthModule } from 'nestjs-firebase-passport';
import { AuthStrategy } from './infrastructure/drivenAdapters/firebase/strategy/AuthStrategy';
import { DatabaseModule } from './infrastructure/drivenAdapters/sequelize/database.module';
@Module({
  imports: [
    FirebaseAuthModule.register({
      audience: process.env.FIREBASE_AUDIENCE,
      issuer: process.env.FIREBASE_ISSUER,
    }),
    PassportModule,
    ConfigModule.forRoot({isGlobal:true}),
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
    LoggerModule,
    ExceptionsModule,
    ResolversModule,
    DatabaseModule,
  ],
  providers: [AuthStrategy],
})
export class AppModule {}
