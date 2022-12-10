import { GenericId, IGenericRepository } from './IGenericRepository'
import { IUser } from '../UserModel'

export abstract class UserRepository implements IGenericRepository<IUser> {
  getAll: () => Promise<IUser[]>
  getById: (id: GenericId) => Promise<IUser>
  create: (args: IUser) => Promise<IUser>
  update: (args: IUser) => Promise<IUser>
  delete: (id: GenericId) => Promise<void>  
  getByEmail: (email: string) => Promise<IUser>
  suscribeUser:(userId: string, planId: number) => Promise<IUser>
}
