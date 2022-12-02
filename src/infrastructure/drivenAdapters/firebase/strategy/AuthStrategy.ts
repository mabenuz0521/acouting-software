import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'hide-on-me',
    });
  }

  async validate(payload) {
    console.log(payload);
    const user = {
      user_id: payload.user_id,
      email: payload.email,
    };
    return user;
  }
}
