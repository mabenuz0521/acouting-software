import { UserDto } from '../dto/user.dto';
import { User } from '../UserModel';

export abstract class UserRepository {
  findAllUser: () => Promise<User[]>;
  findUserById:(id: string)=> Promise<User>;
  findUserByEmail:(email: string)=> Promise<User>;
  updateUser: (id:string,user: UserDto) => Promise<User>;
  createUser: (user: UserDto) => Promise<User>;
  deleteUser: (id: string) => Promise<User>;
}
