import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { IUser } from '../../../../domain/model/data/UserModel';

@Table
export class User extends Model<IUser> implements IUser {

    @Column({
        primaryKey: true
    })
    id: string;

    @Column({
        type: DataType.STRING
    })
    name: string;

    @Column({
        type: DataType.STRING
    })
    lastname: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING
    })
    password: string;

    @Column({
        type: DataType.STRING
    })
    nickname?: string;
}