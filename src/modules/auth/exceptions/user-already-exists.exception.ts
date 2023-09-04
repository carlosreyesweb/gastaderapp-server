import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor(emailOrUsername: string) {
    super(
      `El usuario con el correo o nombre de usuario ${emailOrUsername} ya existe.`,
    );
  }
}
