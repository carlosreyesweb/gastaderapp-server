import { BadRequestException } from '@nestjs/common';

export class WrongPasswordException extends BadRequestException {
  constructor(message = 'Contraseña incorrecta.') {
    super(message);
  }
}
