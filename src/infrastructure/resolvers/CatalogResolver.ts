import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { CatalogInput, CatalogResponse } from '../../application/graphql'
import { CatalogUseCases } from 'src/domain/usecase/CatalogUseCases'
import { CatalogPresenter } from '../presenters/CatalogPresenter'
@Resolver('Catalog')
export class CatalogResolver {
  constructor(private catalogUseCases: CatalogUseCases) {}

  @Mutation()
  async createCatalog(
    @Args('catalogInput') catalogInput: CatalogInput
  ): Promise<CatalogResponse> {
    return new CatalogPresenter(await this.catalogUseCases.create(catalogInput))
  }
	
}
