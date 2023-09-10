import { ConflictException } from '@nestjs/common';

export class AccountAlreadyExistsException extends ConflictException {
  constructor(message = 'Ya existe una cuenta con ese nombre.') {
    super(message);
  }
}
