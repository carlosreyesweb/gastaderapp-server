import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  sign(
    payload: string | object | Buffer,
    secret: string,
    signOptions?: jwt.SignOptions,
  ) {
    return jwt.sign(payload, secret, signOptions);
  }

  decode(token: string, options?: jwt.DecodeOptions) {
    return jwt.decode(token, options);
  }

  verify(token: string, secret: string, options?: jwt.VerifyOptions) {
    return jwt.verify(token, secret, options);
  }
}
