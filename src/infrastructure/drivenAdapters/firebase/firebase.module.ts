import { Module } from '@nestjs/common';
import { usersProviders } from 'src/domain/model/data/repository/providers/user.provider';
import { AuthRepository } from '../../../domain/model/data/repository/AuthRepository';
import { AuthFirebaseRepository } from './implements/AuthFirebaseRepository';
import { FirebaseService } from './service/AuthFirebaseService';

@Module({
  providers: [
    {
      provide: AuthRepository,
      useClass: AuthFirebaseRepository,
    },
    FirebaseService,
    ...usersProviders
  ],
  exports: [
    {
      provide: AuthRepository,
      useClass: AuthFirebaseRepository,
    },
  ],
})
export class FirebaseModule {}
