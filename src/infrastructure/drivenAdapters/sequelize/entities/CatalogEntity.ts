import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript'
import { ICatalog } from 'src/domain/model/data/CatalogModel'
import { User } from './UserEntity'

@Table
export class Catalog extends Model<ICatalog> implements ICatalog {
  
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column({
    type: DataType.STRING,
  })
  name: string

  @ForeignKey(() => Catalog)
  @Column({
    type: DataType.INTEGER,
  })
  catalogId: number

  @HasMany(()=> Catalog)
  subCatalog: Catalog[]

  @HasMany(() => User, 'documentTypeId')
  documentTypeId: User[]

  @HasMany(() => User, 'planId')
  planId: User[]
}
