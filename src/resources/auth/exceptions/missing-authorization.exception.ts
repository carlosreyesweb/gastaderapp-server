import { UnauthorizedException } from '@nestjs/common';

export class MissingAuthorizationException extends UnauthorizedException {
  constructor(message = 'No hay cabecera de autorización.') {
    super(message);
  }
}
