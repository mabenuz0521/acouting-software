import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/model/data/repository/UserRepository';
import { User } from 'src/domain/model/data/UserModel';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserDatabaseRepository implements UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAllUser() {
    return this.userModel.findAll();
  }
}
