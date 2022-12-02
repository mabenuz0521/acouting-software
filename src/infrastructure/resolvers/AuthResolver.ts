import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthUseCases } from '../../domain/usecase/AuthUseCases';
import { GqlAuthGuard } from '../drivenAdapters/firebase/guards/GqlAuthGuard';
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
  greetings(){
    return 'Hola mundoooo'
  }
}
