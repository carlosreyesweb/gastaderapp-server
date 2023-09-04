import { NotFoundException } from '@nestjs/common';

export class AccountNotFoundException extends NotFoundException {
  constructor(message = 'La cuenta no existe.') {
    super(message);
  }
}
