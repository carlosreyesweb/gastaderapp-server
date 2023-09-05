import { BadRequestException } from '@nestjs/common';

export class PasswordsMismatchException extends BadRequestException {
  constructor() {
    super('Contraseña incorrecta.');
  }
}
