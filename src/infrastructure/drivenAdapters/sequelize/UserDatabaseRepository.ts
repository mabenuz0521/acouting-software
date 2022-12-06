import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from 'src/domain/model/data/repository/UserRepository';
import { USER_REPOSITORY } from 'src/domain/model/config/constans';
import { User } from 'src/domain/model/data/UserModel';
import { UserDto } from 'src/domain/model/data/dto/user.dto';
@Injectable()
export class UserDatabaseRepository implements UserRepository {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async createUser(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findAllUser() {
    return this.userRepository.findAll();
  }
}
