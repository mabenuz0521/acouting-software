import { Module } from '@nestjs/common';
import { AuthService } from './infrastructure/auth.service';
import { AuthResolver } from './usescases/auth.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './domain/strategy/auth.local.strategy';
import { JwtStrategy } from './domain/strategy/jwt.strategy';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/auth/domain/graphql.ts'),
        outputAs: 'class',
      },
      playground: false,
      plugins: [ ApolloServerPluginLandingPageLocalDefault ]
    }),
    JwtModule.register({
      signOptions: { expiresIn: '120s' },
      secret: 'hide-me',
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
