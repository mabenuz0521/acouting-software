import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { UserRepository } from 'src/domain/model/data/repository/UserRepository';
import { USER_REPOSITORY } from 'src/domain/model/config/constans';
import { User } from 'src/domain/model/data/UserModel';
import { UserDto } from 'src/domain/model/data/dto/user.dto';
import * as bcrypt from 'bcrypt'; 
@Injectable()
export class UserDatabaseRepository implements UserRepository {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: {
        id,
      },
    });
  }
  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: {
        email,
      },
    });
  }

  async updateUser(id: string, user: UserDto): Promise<User> {
    const userFound = await this.userRepository.findOne<User>({
      where: {
        id,
      },
    });
    if (!userFound) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    const passwordHash = await bcrypt.hash(user.password,10);
    userFound.email = user.email || userFound.email;
    userFound.password = passwordHash;
    try {
      return await userFound.save();
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findByPk<User>(id);
    await user.destroy();
    return new User(user);
  }

  async createUser(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findAllUser() {
    return this.userRepository.findAll();
  }
}
