import { Token  } from '../AuthModel'
export abstract class AuthRepository {
    loginWithEmailAndPassWord: (email: string, password: string) => Promise<Token>
}