import { DecodedIdToken, FirebaseStrategy } from 'nestjs-firebase-passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseCustomStrategy extends FirebaseStrategy {
  constructor() {
    super({
      audience: process.env.FIREBASE_AUDIENCE,
      issuer: process.env.FIREBASE_ISSUER,
    });
  }

  async validate(payload: DecodedIdToken) {
    const user = {
      user_id: payload.uid,
      email: payload.email,
    };
    return user;
  }
}
