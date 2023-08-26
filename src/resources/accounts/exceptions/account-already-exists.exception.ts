import { ConflictException } from '@nestjs/common';

export class AccountAlreadyExistsException extends ConflictException {
  constructor(
    message = 'Ya existe una cuenta con ese nombre o número de cuenta',
  ) {
    super(message);
  }
}
