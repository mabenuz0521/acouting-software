import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthUseCases } from '../../domain/usecase/AuthUseCases';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authUseCases: AuthUseCases) {}

  @Query()
  login(@Args('email') email: string, @Args('password') password: string) {
    return this.authUseCases.login(email, password);
  }

  @Query()
  singup(@Args('email') email: string, @Args('password') password: string) {
    return this.authUseCases.singup(email, password);
  }
}
