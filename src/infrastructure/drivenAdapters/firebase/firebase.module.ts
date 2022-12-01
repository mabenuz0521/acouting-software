import { Module } from '@nestjs/common';
import { AuthRepository } from '../../../domain/model/data/repository/AuthRepository';
import { AuthFirebaseRepository } from './AuthFirebaseRepository';
import { FirebaseService } from './service/AuthFirebaseService';

@Module({
  providers: [
    {
      provide: AuthRepository,
      useClass: AuthFirebaseRepository,
    },
    FirebaseService
  ],
  exports: [
    {
      provide: AuthRepository,
      useClass: AuthFirebaseRepository,
    },
  ],
})
export class FirebaseModule {}
