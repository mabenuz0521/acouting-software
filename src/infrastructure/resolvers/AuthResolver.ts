import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthUseCases } from '../../domain/usecase/AuthUseCases'
import { GqlAuthGuard } from '../drivenAdapters/firebase/guards/GqlAuthGuard'
import { UseGuards } from '@nestjs/common'
@Resolver('Auth')
export class AuthResolver {
  constructor(private authUseCases: AuthUseCases) {}

  @Query()
  login(@Args('email') email: string, @Args('password') password: string) {
    return this.authUseCases.login(email, password)
  }

  @Mutation()
  singup(@Args('email') email: string, @Args('password') password: string) {
    return this.authUseCases.singup(email, password)
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  greetings(@Context() context): string {
    const { req } = context
    //console.log(req['user']);
    return `hola ${req['user'].email}`
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  greeting(@Context() context): string {
    const { req } = context
    //console.log(req['user']);
    return `hola B ${req['user'].email}`
  }
}
