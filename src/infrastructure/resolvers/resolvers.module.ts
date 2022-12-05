import { Module } from '@nestjs/common';
import { AuthResolver } from './AuthResolver';
import { AuthUseCases } from '../../domain/usecase/AuthUseCases';
import { FirebaseModule } from '../drivenAdapters/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [AuthUseCases, AuthResolver],
})
export class ResolversModule {}
