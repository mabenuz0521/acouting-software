import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "-----BEGIN CERTIFICATE-----\nMIIDHTCCAgWgAwIBAgIJAJsmCdlCEtdXMA0GCSqGSIb3DQEBBQUAMDExLzAtBgNV\nBAMMJnNlY3VyZXRva2VuLnN5c3RlbS5nc2VydmljZWFjY291bnQuY29tMB4XDTIy\nMTExOTA5MzkwOFoXDTIyMTIwNTIxNTQwOFowMTEvMC0GA1UEAwwmc2VjdXJldG9r\nZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqGSIb3DQEBAQUA\nA4IBDwAwggEKAoIBAQDPx5SngqCrMJVQ/lFC9kP7Mgnhs4aIIbaquM42Z/zG1c80\nEPEhTlRz9Cltc6wtj0wmRPi9x8HtIRlyoo4ps6LCXH0GxJZ6hZHGlcGUbFTAbVsY\naUWqteiXb2umTEnFV8+IaeOqVvSnJ97RIRcMSa7McKL+AkdjKPuDvdK5R6SHnnML\n3HNJ8Xla1YOWmYkgCAgUNGLLg5bl8M6zyicNg8ZPGV7ndIzjrXuy9yKorpljNzZJ\nhymT29yIq3hFInk+GGaSEaRIW6Zz0QjxUSgjDS75yxHnNM9Sgik3I6X8SHKO6mdY\naG4GAQUcuHr8eaZH9vYR0RG50c+fMw/P38nr0i8VAgMBAAGjODA2MAwGA1UdEwEB\n/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMCMA0G\nCSqGSIb3DQEBBQUAA4IBAQCvRsaUOJj8yA5Ul/LhoBFwEmZaQuU5sUKWGMJJj4ug\nWzBPtCEfsmYsMQWmaSY7PiHn7eOF7rUL6FRaHvy1sMwF+xp4xomrIp+GQPQA4hra\nAlgJRUUslTMJkbypsZ6PMWMLJw2WtyFcaIq/5vdywExwcfi+Gi7lDHTyfSCTiDvq\nqK85W7OpqkmSxFKcva9Gi0tLLNgrRR9953Pwqis3LRVwKX6yXQ0j0v2pTmIyH/zp\nVrUK77PjKaWlZISsmLH5dF4Olclx6hRFhvUYVXmT0K/hqr4pBZWukt4D9cD6ZSem\nqFbFBUPmxj4clHXqiqRmQ3tv6MkpudXzCNb0wYWk+3TU\n-----END CERTIFICATE-----\n",
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}