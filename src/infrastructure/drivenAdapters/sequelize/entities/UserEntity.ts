import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { IUser } from '../../../../domain/model/data/UserModel'
import { Catalog } from './CatalogEntity'

@Table
export class User extends Model<IUser> implements IUser {
  @Column({
    primaryKey: true,
  })
  id: string

  @Column({
    type: DataType.STRING,
  })
  name: string

  @Column({
    type: DataType.STRING,
  })
  lastname: string

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string

  @Column({
    type: DataType.STRING,
  })
  password: string

  @Column({
    type: DataType.STRING,
  })
  nickname?: string

  @ForeignKey(() => Catalog)
  @Column({
    type: DataType.INTEGER,
  })
  documentTypeId: number

  @BelongsTo(()=> Catalog, 'documentTypeId')
  document: Catalog

  @ForeignKey(() => Catalog)
  @Column({
    type: DataType.INTEGER,
  })
  planId: number

  @BelongsTo(()=> Catalog, 'planId')
  plan: Catalog
}
