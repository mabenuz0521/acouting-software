import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {

    @Column({primaryKey:true})
    id?: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    email?: string;

    @Column({
        type: DataType.STRING
    })
    password?: string;

}