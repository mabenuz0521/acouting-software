import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { UserResponse } from 'src/application/graphql'
import { UserUseCases } from 'src/domain/usecase/UserUseCases'
import { GqlAuthGuard } from '../drivenAdapters/firebase/guard/GqlAuthGuard'
import { UserPresenter } from '../presenters/UserPresenter'
import { UseGuards } from '@nestjs/common'


@UseGuards(GqlAuthGuard)
@Resolver('Plan')
export class PlanResolver {
  constructor(private userUsesCases: UserUseCases) {}

  @Mutation()
  async suscribeUser(
    @Context() context,
    @Args('planId') planId: number
  ): Promise<UserResponse> {
    const { req } = context
    return new UserPresenter(
      await this.userUsesCases.suscribeUser(req['user'].user_id, planId)
    )
  }
}
