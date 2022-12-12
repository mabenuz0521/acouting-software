import { Controller, Get, Param } from '@nestjs/common'
import { CatalogUseCases } from 'src/domain/usecase/CatalogUseCases'

@Controller('/')
export class TesController {
  constructor(private catalogUsesCases: CatalogUseCases) {}

  @Get('catalogs')
  async getPlans() {
    return await this.catalogUsesCases.getAllCatalog()
  }

}
