import { Sequelize } from 'sequelize-typescript'
import {
  SEQUELIZE,
  DEVELOPMENT,
  TEST,
  PRODUCTION,
} from '../../../domain/model/config/constans'
import { databaseConfig } from 'src/domain/model/config/database.config'
import { User } from '../sequelize/entities/UserEntity'

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config
      console.log(process.env.NODE_ENV)
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development
          break
        case TEST:
          config = databaseConfig.test
          break
        case PRODUCTION:
          config = databaseConfig.production
          break
        default:
          config = databaseConfig.development
      }
      const sequelize = new Sequelize(config)
      sequelize.addModels([User])
      await sequelize.sync()
      return sequelize
    },
  },
]
