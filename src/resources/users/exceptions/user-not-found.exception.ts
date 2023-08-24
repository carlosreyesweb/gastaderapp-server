import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(message = 'Usuario no encontrado.') {
    super(message);
  }
}
