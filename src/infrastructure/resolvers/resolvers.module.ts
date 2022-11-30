import { Module } from '@nestjs/common';
import { AuthResolver } from './AuthResolver'
import { AuthUseCases } from '../../domain/usecase/AuthUseCases'
import { AuthRepository } from '../../domain/model/data/repository/AuthRepository'
import { AuthFirebaseRepository } from '../drivenAdapters/firebase/AuthFirebaseRepository'

@Module({
    providers: [
        {
            provide: AuthRepository,
            useClass: AuthFirebaseRepository
        },
        AuthUseCases,
        AuthResolver
    ]
})
export class ResolversModule {}
