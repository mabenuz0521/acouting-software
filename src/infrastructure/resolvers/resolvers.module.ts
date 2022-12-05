import { Module } from '@nestjs/common';
import { AuthResolver } from './AuthResolver';
import { AuthUseCases } from '../../domain/usecase/AuthUseCases';
import { FirebaseModule } from '../drivenAdapters/firebase/firebase.module';
import { UserUseCase } from 'src/domain/usecase/UserUseCases';

@Module({
  imports: [FirebaseModule],
  providers: [AuthUseCases, AuthResolver, UserUseCase],
})
export class ResolversModule {}
