import { Token, UserAuth  } from '../AuthModel'
export abstract class AuthRepository {
    loginWithEmailAndPassWord: (email: string, password: string) => Promise<Token>
    singupWithEmailAndPassword: (email: string, password: string) => Promise<UserAuth>
}