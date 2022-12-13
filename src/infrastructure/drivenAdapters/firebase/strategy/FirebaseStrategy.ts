import { Injectable, Inject } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { DecodedIdToken } from './DecodedIdToken'
import { FIREBASE_AUTH_CONFIG } from '../constans/constans'
import { FirebaseAuthConfig } from '../config/FirebaseAuthConfig'
import { passportJwtSecret } from 'jwks-rsa'

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor(
    @Inject(FIREBASE_AUTH_CONFIG) { issuer, audience }: FirebaseAuthConfig
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWT_URI,
      }),
      issuer,
      audience,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
    })
  }

  validate(payload: DecodedIdToken): any | Promise<any> {
    return payload
  }
}
