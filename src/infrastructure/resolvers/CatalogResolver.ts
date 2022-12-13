import { Resolver, Args, Query } from '@nestjs/graphql'
import { CatalogResponse } from '../../application/graphql'
import { CatalogUseCases } from 'src/domain/usecase/CatalogUseCases'
import { CatalogPresenter } from '../presenters/CatalogPresenter'
import { GqlAuthGuard } from '../drivenAdapters/firebase/guard/GqlAuthGuard'
import { UseGuards } from '@nestjs/common'

@UseGuards(GqlAuthGuard)
@Resolver('Catalog')
export class CatalogResolver {
  constructor(private catalogUseCases: CatalogUseCases) {}

  @Query()
  async getCatalogs(): Promise<CatalogResponse[]> {
    const data = await this.catalogUseCases.getAllCatalog()
    return data.map((catalog) => new CatalogPresenter(catalog))
  }

  @Query()
  async getCatalogById(@Args('id') id: number): Promise<CatalogResponse> {
    return new CatalogPresenter(await this.catalogUseCases.getCatalog(id))
  }
}
