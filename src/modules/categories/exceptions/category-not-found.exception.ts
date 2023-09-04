import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor(message = 'No existe la categoría.') {
    super(message);
  }
}
