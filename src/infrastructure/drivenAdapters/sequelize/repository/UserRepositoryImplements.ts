import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRepository } from 'src/domain/model/data/repository/UserRepository';
import { User } from '../../../../domain/model/data/UserModel';

@Injectable()
export class UserRepositoryImplement implements UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAllUser() {
    return await this.userModel.findAll();
  }
}
