import { UnauthorizedException } from '@nestjs/common';

export class SessionNotFoundException extends UnauthorizedException {
  constructor(
    message = 'Sesión no encontrada. Por favor, inicia sesión nuevamente.',
  ) {
    super(message);
  }
}
