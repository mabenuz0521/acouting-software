import { Token } from 'src/domain/model/data/AuthModel';
import { AuthRepository } from '../../../domain/model/data/repository/AuthRepository'

export class AuthFirebaseRepository implements AuthRepository {
    async loginWithEmailAndPassWord(email: string, password: string) {
        
        const response: Token = {
            token: 'eyljhsdfhdhs'
        }

        return response
    };
    
}