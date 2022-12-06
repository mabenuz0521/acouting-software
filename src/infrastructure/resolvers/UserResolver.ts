import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserDto } from 'src/domain/model/data/dto/user.dto';
import { UserUseCases } from 'src/domain/usecase/UserUseCases';
import { GqlAuthGuard } from '../drivenAdapters/firebase/guards/GqlAuthGuard';
import { UseGuards } from '@nestjs/common';
@Resolver('User')
export class UserResolver {
  constructor(private userUseCases: UserUseCases) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  users() {
    return this.userUseCases.findAll();
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  user(@Args('id') id: string) {
    return this.userUseCases.findUserById(id);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  userEmail(@Args('email') email: string) {
    return this.userUseCases.findUserByEmail(email);
  }

  @Mutation(() => UserDto)
  update(@Args('id') id: string, @Args('userdto') userdto: UserDto) {
    return this.userUseCases.updateUser(id, userdto);
  }
}
