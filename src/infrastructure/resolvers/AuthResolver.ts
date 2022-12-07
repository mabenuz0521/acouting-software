import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql'
import { AuthUseCases } from '../../domain/usecase/AuthUseCases'
import {  UseGuards } from '@nestjs/common'
import { UserInput, AuthTokenResponse } from 'src/application/graphql'
import { AuthPresenter } from '../presenters/AuthPresenter'
import { AuthGuard } from '@nestjs/passport'
@Resolver('Auth')
export class AuthResolver {
  constructor(private authUseCases: AuthUseCases) {}
 
  @Mutation()
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ): Promise<AuthTokenResponse> {
    return new AuthPresenter(await this.authUseCases.login(email, password))
  }

  @Mutation()
  async signup(
    @Args('userInput') userInput: UserInput
  ): Promise<AuthTokenResponse> {
    return new AuthPresenter(await this.authUseCases.singup(userInput))
  }

 
 

  
  // @Query()
  // @UseGuards(GqlAuthGuard)
  // greeting(@Context() context): string {
  //   const { req } = context
  //   //console.log(req['user']);
  //   return `hola B ${req['user'].email}`
  // }
}
