import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
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

	@Query()
	async getCatalogs(): Promise<CatalogResponse[]> {
    const data = await this.catalogUseCases.getAllCatalog()
    return data.map((catalog) => new CatalogPresenter(catalog))
  }
	
}
