import { Injectable } from '@nestjs/common';
import { UserDto } from '../model/data/dto/user.dto';
import { UserRepository } from '../model/data/repository/UserRepository';
import { IUser } from '../model/data/UserModel';

@Injectable()
export class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  findAll() {
    return this.userRepository.getAll();
  }

  create(user: IUser) {
    return this.userRepository.create(user);
  }

  findUserById(id: string) {
    return this.userRepository.getById(id);
  }

  findUserByEmail(email: string) {
    return this.userRepository.getByEmail(email);
  }

  async updateUser(id: string, userParams: Partial<Omit<IUser, 'id'>>) {
    const user = await this.userRepository.getById(id)
    
    return this.userRepository.update(Object.assign(user, userParams));
  }

  deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}
