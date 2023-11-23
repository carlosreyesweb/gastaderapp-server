import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { OwnershipViolationException } from 'src/modules/users/exceptions/ownership-violation.exception';
import { AccountsService } from '../../accounts.service';

@Injectable()
export class AccountOwnershipGuard implements CanActivate {
  constructor(private readonly accountsService: AccountsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const id = request.params.id;
    const account = await this.accountsService.findOne(id);
    const owns = account.userId === request.userId;
    if (!owns) {
      throw new OwnershipViolationException('No eres el dueño de esta cuenta.');
    }
    request.account = account;

    return true;
  }
}
