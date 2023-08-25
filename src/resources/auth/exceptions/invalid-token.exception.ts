import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super('El token no es válido. Por favor, inicia sesión.');
  }
}