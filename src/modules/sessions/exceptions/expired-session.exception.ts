import { UnauthorizedException } from '@nestjs/common';

export class ExpiredSessionException extends UnauthorizedException {
  constructor(
    message = 'Sesión expirada. Por favor, inicia sesión nuevamente.',
  ) {
    super(message);
  }
}
