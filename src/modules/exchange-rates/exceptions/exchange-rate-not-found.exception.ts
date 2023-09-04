import { NotFoundException } from '@nestjs/common';

export class ExchangeRateNotFoundException extends NotFoundException {
  constructor(message = 'La tasa de cambio no existe.') {
    super(message);
  }
}
