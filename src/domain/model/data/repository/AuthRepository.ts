import { IAuth } from '../AuthModel'
import { IUser } from '../UserModel'

export abstract class AuthRepository {
  loginWithEmailAndPassWord: (email: string, password: string) => Promise<IAuth>
  singupWithEmailAndPassword: (args: IUser) => Promise<IAuth>
}
