import { Query, Resolver } from '@nestjs/graphql';
import { UserUseCases } from 'src/domain/usecase/UserUseCases';


@Resolver('User')
export class UserResolver{
    constructor(private userUseCases: UserUseCases){}

    @Query()
    users(){
        return this.userUseCases.findAll();
    }
}