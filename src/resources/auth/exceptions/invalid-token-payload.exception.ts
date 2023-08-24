import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenPayloadException extends UnauthorizedException {
  constructor() {
    super('El token no tiene un payload válido.');
  }
}
