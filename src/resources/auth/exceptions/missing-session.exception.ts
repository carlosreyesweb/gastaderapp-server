import { UnauthorizedException } from '@nestjs/common';

export class MissingSessionException extends UnauthorizedException {
  constructor() {
    super('No hay sesión.');
  }
}
