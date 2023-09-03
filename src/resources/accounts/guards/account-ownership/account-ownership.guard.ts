import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { UserEntity } from 'src/resources/users/entities/user.entity';
import { OwnershipViolationException } from 'src/resources/users/exceptions/ownership-violation.exception';
import { AccountsService } from '../../accounts.service';
import { AccountEntity } from '../../entities/account.entity';
import { AccountNotFoundException } from '../../exceptions/account-not-found.exception';

@Injectable()
export class AccountOwnershipGuard implements CanActivate {
  constructor(private readonly accountsService: AccountsService) {}

  async canActivate(context: ExecutionContext) {
    const request: ExtendedRequest<{
      user: UserEntity;
      account?: AccountEntity;
    }> = context.switchToHttp().getRequest();

    const accountId = +request.params.accountId;
    const account = await this.accountsService.findOne(accountId);
    if (!account) throw new AccountNotFoundException();

    const userId = request.user?.id;

    const owns = account.userId === userId;
    if (!owns) {
      throw new OwnershipViolationException('No eres el dueño de esta cuenta.');
    }

    request.account = account;

    return true;
  }
}
