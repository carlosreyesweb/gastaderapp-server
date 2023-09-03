import { ForbiddenException } from '@nestjs/common';

export class PasswordMutationException extends ForbiddenException {
  constructor(message = 'No se puede cambiar la contraseña desde aquí.') {
    super(message);
  }
}
