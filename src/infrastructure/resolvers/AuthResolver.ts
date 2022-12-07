import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthUseCases } from '../../domain/usecase/AuthUseCases'
import { GqlAuthGuard } from '../drivenAdapters/firebase/guards/GqlAuthGuard'
import { UseGuards } from '@nestjs/common'
import { UserInput, AuthTokenResponse } from 'src/application/graphql'
import { AuthPresenter } from '../presenters/AuthPresenter'
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
  // greetings(@Context() context): string {
  //   const { req } = context
  //   //console.log(req['user']);
  //   return `hola ${req['user'].email}`
  // }

  // @Query()
  // @UseGuards(GqlAuthGuard)
  // greeting(@Context() context): string {
  //   const { req } = context
  //   //console.log(req['user']);
  //   return `hola B ${req['user'].email}`
  // }
}
