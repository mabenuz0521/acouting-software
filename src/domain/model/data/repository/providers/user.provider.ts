import { User } from '../../../../../infrastructure/drivenAdapters/sequelize/entities/UserEntity'
import { USER_REPOSITORY } from '../../../config/constans'

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
]
