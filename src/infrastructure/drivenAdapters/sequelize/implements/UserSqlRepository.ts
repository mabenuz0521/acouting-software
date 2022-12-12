import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common'
import { UserRepository } from 'src/domain/model/data/repository/UserRepository'
import { USER_REPOSITORY } from 'src/domain/model/config/constans'
import { IUser } from 'src/domain/model/data/UserModel'
import { User } from '../entities/UserEntity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserSqlRepository implements UserRepository {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User
  ) {}

  async getById(id: string): Promise<IUser> {
    const userFound = await this.userRepository.findOne<User>({
      where: {
        id,
      },
      include: ['plan', 'documentType'],
    })

    if (!userFound) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
    }
    return userFound
  }

  async getByEmail(email: string): Promise<IUser> {
    const userFound = await this.userRepository.findOne<User>({
      where: {
        email,
      },
    })

    if (!userFound) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
    }
    return userFound
  }

  async update(user: IUser): Promise<IUser> {
    const userFound = await this.userRepository.findOne<User>({
      where: {
        id: user.id,
      },
    })
    if (!userFound) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
    }
    const passwordHash = await bcrypt.hash(user.password, 10)
    userFound.email = user.email || userFound.email
    userFound.password = passwordHash
    try {
      return await userFound.save()
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async suscribeUser(userId: string, planId: number): Promise<IUser> {
    const userFound = await this.userRepository.findOne<User>({
      where: {
        id: userId,
      },
      include: ['plan', 'documentType'],
    })
    if (!userFound) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
    }
    userFound.planId = planId
    userFound.documentTypeId = planId
    try {
      return await userFound.save()
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findByPk<User>(id)
    await user.destroy()
  }

  async create(user: IUser): Promise<IUser> {
    return await this.userRepository.create<User>(user)
  }

  async getAll() {
    return this.userRepository.findAll({
      include: ['plan', 'documentType'],
    })
  }
}
