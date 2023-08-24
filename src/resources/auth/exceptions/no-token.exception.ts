import { UnauthorizedException } from '@nestjs/common';

export class NoTokenException extends UnauthorizedException {
  constructor() {
    super('No hay token en la cabecera de autorización.');
  }
}
