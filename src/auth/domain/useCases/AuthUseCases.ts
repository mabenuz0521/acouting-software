import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../model/repository/AuthRepository'

@Injectable()
export class AuthUseCases {
    constructor(
        private authRepository: AuthRepository
    ) {}

    login(username: string, password: string) {
        return this.authRepository.loginWithEmailAndPassWord(username, password)
    }
}
