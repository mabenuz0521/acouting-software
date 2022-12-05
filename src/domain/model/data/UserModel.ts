import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({primaryKey:true})
  id?: string;

  @Column
  email?: string;

  @Column
  password?: string;

  @Column({defaultValue: ()=>'CURRENT_TIMESTAMP'})
  createdAt?: string;

  @Column({defaultValue: ()=>'CURRENT_TIMESTAMP'})
  updatedAt?: string;
}