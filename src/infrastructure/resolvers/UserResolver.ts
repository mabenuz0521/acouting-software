import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { UserUseCases } from 'src/domain/usecase/UserUseCases'
import { UseGuards } from '@nestjs/common'
import { UserInput, UserResponse } from '../../application/graphql'
import { UserPresenter } from '../presenters/userPresenter'
import { GqlAuthGuard } from '../drivenAdapters/firebase/guard/GqlAuthGuard'
@Resolver('User')
export class UserResolver {
  constructor(private userUseCases: UserUseCases) {}

  @Query()
  async getUsers(): Promise<UserResponse[]> {
    const data = await this.userUseCases.findAll()
    return data.map((user) => new UserPresenter(user))
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  greeting(@Context() context) {
    const { req } = context
    return `Hola ${req['user'].email}`
  }

  @Query()
  async getUser(@Args('id') id: string): Promise<UserResponse> {
    return new UserPresenter(await this.userUseCases.findUserById(id))
  }

  @Query()
  async getUserByEmail(@Args('email') email: string): Promise<UserResponse> {
    return new UserPresenter(await this.userUseCases.findUserByEmail(email))
  }

  @Mutation()
  async updateUser(
    @Args('id') id: string,
    @Args('userInput') userInput: UserInput
  ): Promise<UserResponse> {
    return new UserPresenter(
      await this.userUseCases.updateUser(id, { ...userInput })
    )
  }
}
