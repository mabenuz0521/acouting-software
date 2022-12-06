import { UserDto } from '../dto/user.dto';
import { User } from '../UserModel';

export abstract class UserRepository {
  findAllUser: () => Promise<User[]>;
  createUser: (user: UserDto) => Promise<User>;
}
