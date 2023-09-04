import { UnauthorizedException } from '@nestjs/common';

export class MissingAuthorizationException extends UnauthorizedException {
  constructor() {
    super('No hay cabecera de autorización. Por favor, inicia sesión.');
  }
}
