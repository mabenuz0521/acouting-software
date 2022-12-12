import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UserResponse } from 'src/application/graphql'
import { UserUseCases } from 'src/domain/usecase/UserUseCases'
import { GqlAuthGuard } from '../drivenAdapters/firebase/guard/GqlAuthGuard'
import { UserPresenter } from '../presenters/userPresenter'
import { UseGuards } from '@nestjs/common'

@Resolver('Plan')
export class PlanResolver {
  constructor(private userUsesCases: UserUseCases) {}

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async suscribeUser(
    @Args('userId') userId: string,
    @Args('planId') planId: number
  ): Promise<UserResponse> {
    return new UserPresenter(
      await this.userUsesCases.suscribeUser(userId, planId)
    )
  }
}
