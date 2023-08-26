import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestWithUser } from 'src/common/types/request-with-user.type';
import { OwnershipViolationException } from 'src/resources/users/exceptions/ownership-violation.exception';
import { AccountsService } from '../../accounts.service';
import { AccountNotFoundException } from '../../exceptions/account-not-found.exception';

@Injectable()
export class AccountOwnershipGuard implements CanActivate {
  constructor(private readonly accountsService: AccountsService) {}

  async canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    const accountId = +request.params.accountId;
    const account = await this.accountsService.findOne(accountId);
    if (!account) throw new AccountNotFoundException();

    const userId = request.user?.id;

    const owns = account.userId === userId;
    if (!owns) {
      throw new OwnershipViolationException('No eres el dueño de esta cuenta.');
    }

    return true;
  }
}
