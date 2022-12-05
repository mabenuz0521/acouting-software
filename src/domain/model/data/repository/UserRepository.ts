import { User } from '../UserModel';

export abstract class UserRepository {
    findAllUser:()=>Promise<User[]>
}