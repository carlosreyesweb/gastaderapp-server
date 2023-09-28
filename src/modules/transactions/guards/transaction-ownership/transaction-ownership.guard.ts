import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { OwnershipViolationException } from 'src/modules/users/exceptions/ownership-violation.exception';
import { TransactionsService } from '../../transactions.service';

@Injectable()
export class TransactionOwnershipGuard implements CanActivate {
  constructor(private readonly transactionsService: TransactionsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const id = request.params.id;
    const transaction = await this.transactionsService.findOne(id);

    const owns = transaction.account?.userId === request.userId;
    if (!owns) {
      throw new OwnershipViolationException(
        'No eres el dueño de la cuenta cuya transacción quieres acceder.',
      );
    }

    request.transaction = transaction;

    return true;
  }
}
