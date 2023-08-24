import { ForbiddenException } from '@nestjs/common';

export class OwnershipViolationException extends ForbiddenException {
  constructor(message = 'No eres dueño de este recurso.') {
    super(message);
  }
}
