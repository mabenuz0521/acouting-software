import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { CatalogResponse, UserResponse } from '../../application/graphql'
import { CatalogUseCases } from 'src/domain/usecase/CatalogUseCases'
import { CatalogPresenter } from '../presenters/CatalogPresenter'
import { UserUseCases } from 'src/domain/usecase/UserUseCases'
import { UserPresenter } from '../presenters/userPresenter'

@Resolver('Catalog')
export class CatalogResolver {
  constructor(
    private catalogUseCases: CatalogUseCases,
    private userUsesCases: UserUseCases
  ) {}

  @Query()
  async getCatalogs(): Promise<CatalogResponse[]> {
    const data = await this.catalogUseCases.getAllCatalog()
    return data.map((catalog) => new CatalogPresenter(catalog))
  }

  @Query()
  async getCatalog(@Args('id') id: number): Promise<CatalogResponse> {
    return new CatalogPresenter(await this.catalogUseCases.getCatalog(id))
  }

  @Mutation()
  async suscribeUser(
    @Args('userId') userId: string,
    @Args('planId') planId: number
  ): Promise<UserResponse> {
    return new UserPresenter(
      await this.userUsesCases.suscribeUser(userId, planId)
    )
  }
}
