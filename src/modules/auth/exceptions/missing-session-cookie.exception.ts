import { UnauthorizedException } from '@nestjs/common';

export class MissingSessionCookieException extends UnauthorizedException {
  constructor(message = 'No se ha iniciado sesión.') {
    super(message);
  }
}
