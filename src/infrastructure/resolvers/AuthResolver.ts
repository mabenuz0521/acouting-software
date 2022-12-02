import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthUseCases } from '../../domain/usecase/AuthUseCases';
import { GqlAuthGuard } from '../drivenAdapters/firebase/guards/GqlAuthGuard';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/domain/model/data/AuthModel';
import { FirebaseCustomStrategy } from '../drivenAdapters/firebase/strategy/FirebaseCustomStrategy';
import { Request } from 'express';
import { Req } from '@nestjs/common';
import { Json } from 'sequelize/types/utils';
@Resolver('Auth')
export class AuthResolver {
  constructor(private authUseCases: AuthUseCases) {}

  @Query()
  login(@Args('email') email: string, @Args('password') password: string, @Context() context) {
    return this.authUseCases.login(email, password);
  }

  @Query()
  singup(@Args('email') email: string, @Args('password') password: string) {
    return this.authUseCases.singup(email, password);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  greeting(): string{
    return `holla mundo  `;
  }
  
}
