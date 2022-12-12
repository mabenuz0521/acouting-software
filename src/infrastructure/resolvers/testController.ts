import { Controller, Get, Param , ParseIntPipe} from '@nestjs/common'
import { CatalogUseCases } from 'src/domain/usecase/CatalogUseCases'

@Controller('/')
export class TesController {
  constructor(private catalogUsesCases: CatalogUseCases) {}

  @Get('catalogs')
  async getPlans() {
    return await this.catalogUsesCases.getAllCatalog()
  }

  @Get('catalogs/:id')
  async getPlan(@Param('id',ParseIntPipe) id: number) {
    return await this.catalogUsesCases.getCatalog(id)
  }


}
