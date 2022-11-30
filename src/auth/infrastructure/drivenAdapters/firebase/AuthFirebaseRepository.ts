import { Token } from 'src/auth/domain/model/AuthModel';
import { AuthRepository } from '../../../domain/model/repository/AuthRepository'

export class AuthFirebaseRepository implements AuthRepository {
    async loginWithEmailAndPassWord(email: string, password: string) {
        
        const response: Token = {
            token: 'eyljhsdfhdhs'
        }

        return response
    };
    
}