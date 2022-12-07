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
        jwksUri:
          'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com',
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
