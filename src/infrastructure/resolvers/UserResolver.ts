import { Query, Resolver, Mutation,Args } from '@nestjs/graphql';
import { UserDto } from 'src/domain/model/data/dto/user.dto';
import { UserUseCases } from 'src/domain/usecase/UserUseCases';
import { GqlAuthGuard } from '../drivenAdapters/firebase/guards/GqlAuthGuard';
import {  UseGuards } from '@nestjs/common';
@Resolver('User')
export class UserResolver{
    constructor(private userUseCases: UserUseCases){}

    @Query()
    @UseGuards(GqlAuthGuard)
    users(){
        return this.userUseCases.findAll();
    }


    // @Mutation(()=> UserDto)
    // register(@Args('userdto') userdto: UserDto){
    //     return this.userUseCases.create(userdto);
    // }

}