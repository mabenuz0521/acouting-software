import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserUseCases } from 'src/domain/usecase/UserUseCases';
import { GqlAuthGuard } from '../drivenAdapters/firebase/guards/GqlAuthGuard';
import { UseGuards } from '@nestjs/common';
import { UserInput, UserResponse } from '../../application/graphql';
import { UserPresenter } from '../presenters/userPresenter';

@Resolver('User')
export class UserResolver {
  constructor(private userUseCases: UserUseCases) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async getUsers(): Promise<UserResponse[]> {
    const data = await this.userUseCases.findAll()
    return data.map((user) => new UserPresenter(user));
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async getUser(@Args('id') id: string): Promise<UserResponse> {
    return new UserPresenter((await this.userUseCases.findUserById(id)));
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async getUserByEmail(@Args('email') email: string): Promise<UserResponse> {
    return new UserPresenter((await this.userUseCases.findUserByEmail(email)));
  }

  @Mutation()
  async updateUser(@Args('id') id: string, @Args('userInput') userInput: UserInput): Promise<UserResponse>{
    return new UserPresenter((await this.userUseCases.updateUser(id, {...userInput})));
  }
}
