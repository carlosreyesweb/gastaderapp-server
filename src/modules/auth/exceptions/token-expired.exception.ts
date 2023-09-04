import { UnauthorizedException } from '@nestjs/common';

export class TokenExpiredException extends UnauthorizedException {
  constructor() {
    super('El token ha expirado. Vuelve a iniciar sesión.');
  }
}
