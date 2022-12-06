import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIL9VBFWkatBEwDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAwwmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjIx\nMTI3MDkzOTA5WhcNMjIxMjEzMjE1NDA5WjAxMS8wLQYDVQQDDCZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBAMv8fPZpFxgcfYSb7pcoV/iJMI+2qgFjASTNUHsRpzNFoqNH\nKoghPZbaTK1W4CFfza0kPa1BH1qDUmZ9qB517w8P4JJKrD5cUoChrzelqotPhMHx\nYzVNfnFjnMp5HiAi25EaTQdyBSvoH9+WZHRAl6X0DfQ8vX2+xVAF9BnaKtTodFrS\nyzt2cGQMJx3UdwordV4hF8nSyow7pN21Tg2+DklcF/rred51+fFcVJphfEYTMtAe\nwvbbDXZwy0Y9QAWd0nHbCjvEB3mCrGeFsKmsXTNZ/cwwo9aMD/+MAJJ3w0PCM5fm\n5rizkJasiW2D+zI3i8qAl7dF9981P3ilQ7MnJu8CAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAHHf+encKrLeDWRMavQiSD8wG9shSi8fFgcTIGVVcQCJ\nMoXcUOpGrrHj/TFTbXjQqwo/Zyi29IO/vZIeT+s1ee1P3CErZgTQjuzywmoKDeyl\n9ImrkjpC7rKulCSIZ7+Q9JMyU4VqmIYvfNwtE9u0tVlQBjOgDKgFzVYE+2lysAKB\nZQMG9P/yaVqbtt/FY0rVkq/UaExflEB1hRwvFix+Q34k43y9FTD6HIf/wJz2zSDZ\nS+Uutx35KElOLjfxcSVozzI79PQh39dBIvQWpakDyyg7UY3CtfOjbfoyTH5mbOUN\nHeZIoVEh2EbA4d8P4tMYQIa8NU9HDwYUzCTG8UfIfmA=\n-----END CERTIFICATE-----\n',
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
