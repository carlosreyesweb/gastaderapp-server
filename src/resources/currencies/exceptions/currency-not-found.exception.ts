import { NotFoundException } from '@nestjs/common';

export class CurrencyNotFoundException extends NotFoundException {
  constructor(message = 'La moneda no fue encontrada.') {
    super(message);
  }
}
