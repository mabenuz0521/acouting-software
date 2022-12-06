import { Query, Resolver, Mutation,Args } from '@nestjs/graphql';
import { UserDto } from 'src/domain/model/data/dto/user.dto';
import { UserUseCases } from 'src/domain/usecase/UserUseCases';

@Resolver('User')
export class UserResolver{
    constructor(private userUseCases: UserUseCases){}

    @Query()
    users(){
        return this.userUseCases.findAll();
    }


    @Mutation(()=> UserDto)
    register(@Args('userdto') userdto: UserDto){
        return this.userUseCases.create(userdto);
    }

}