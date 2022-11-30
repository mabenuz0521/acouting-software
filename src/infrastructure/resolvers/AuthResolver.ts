import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthUseCases } from '../../domain/usecase/AuthUseCases'

@Resolver('Auth')
export class AuthResolver {

    constructor(
        private authUseCases: AuthUseCases
    ) { }


    @Query()
    login(
        @Args('username') username: string,
        @Args('password') password: string,
    ) {
        return this.authUseCases.login(username, password)
    }

}
