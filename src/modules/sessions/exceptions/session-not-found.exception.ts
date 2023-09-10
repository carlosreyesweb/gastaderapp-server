import { NotFoundException } from '@nestjs/common';

export class SessionNotFoundException extends NotFoundException {
  constructor(message = 'Sesión no encontrada.') {
    super(message);
  }
}
