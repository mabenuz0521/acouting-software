import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../model/data/repository/AuthRepository'

@Injectable()
export class AuthUseCases {
    constructor(
        private authRepository: AuthRepository
    ) {}

    login(email: string, password: string) {
        return this.authRepository.loginWithEmailAndPassWord(email, password)
    }
}
