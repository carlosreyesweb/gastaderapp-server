import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor(email: string) {
    super(`El usuario con el correo ${email} ya existe.`);
  }
}
