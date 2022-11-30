import { Module } from '@nestjs/common';
import { AuthRepository } from './domain/model/repository/AuthRepository';
import { AuthFirebaseRepository } from './infrastructure/drivenAdapters/firebase/AuthFirebaseRepository';
import { AuthResolver } from './infrastructure/resolvers/AuthResolver'
import { AuthUseCases } from './domain/useCases/AuthUseCases'


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
export class AuthModule {}
