import {DynamicModule, Global, Module} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from './strategy/FirebaseStrategy';
import { FirebaseAuthConfig } from './config/FirebaseAuthConfig';
import { FIREBASE_AUTH_CONFIG } from './constans/constans';

@Global()
@Module({})
export class FirebaseAuthModule {
  static register(firebaseAuthConfig: FirebaseAuthConfig): DynamicModule {
    return {
      module: FirebaseAuthModule,
      imports: [PassportModule.register({ defaultStrategy: 'firebase' })],
      providers: [
        {
          provide: FIREBASE_AUTH_CONFIG,
          useValue: firebaseAuthConfig,
        },
        FirebaseStrategy,
      ],
      exports: [PassportModule, FirebaseStrategy, FIREBASE_AUTH_CONFIG],
    };
  }
}