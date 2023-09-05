import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { OwnershipViolationException } from 'src/modules/users/exceptions/ownership-violation.exception';
import { AccountsService } from '../../accounts.service';
import { AccountEntity } from '../../entities/account.entity';

@Injectable()
export class AccountOwnershipGuard implements CanActivate {
  constructor(private readonly accountsService: AccountsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<
      ExtendedRequest<{
        user: UserEntity;
        account?: AccountEntity;
      }>
    >();

    const accountId = +request.params.id;
    const account = await this.accountsService.findOne(accountId);

    const userId = request.user.id;

    const owns = account.userId === userId;
    if (!owns) {
      throw new OwnershipViolationException('No eres el dueño de esta cuenta.');
    }

    request.account = account;

    return true;
  }
}
