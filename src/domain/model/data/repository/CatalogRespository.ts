import { ICatalog } from '../CatalogModel'
export abstract class CatalogRepository {
  create: (args: ICatalog)=> Promise<ICatalog>
  getById:(id: number) => Promise<ICatalog>
  getAll:() => Promise<ICatalog[]>
}
