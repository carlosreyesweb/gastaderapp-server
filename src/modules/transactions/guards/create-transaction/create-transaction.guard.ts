import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AccountsService } from 'src/modules/accounts/accounts.service';
import { CategoriesService } from 'src/modules/categories/categories.service';
import { OwnershipViolationException } from 'src/modules/users/exceptions/ownership-violation.exception';

@Injectable()
export class CreateTransactionGuard implements CanActivate {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const accountId = request.body.accountId;
    const account = await this.accountsService.findOne(accountId);
    const owns = account.userId === request.userId;
    if (!owns) {
      throw new OwnershipViolationException(
        'No puedes crear transacciones en cuentas que no te pertenecen.',
      );
    }
    const categoryId = request.body.categoryId;
    if (categoryId) {
      const category = await this.categoriesService.findOne(categoryId);
      const ownsCategory = category.userId === request.userId;
      if (!ownsCategory) {
        throw new OwnershipViolationException(
          'No puedes crear transacciones con categorías que no te pertenecen.',
        );
      }
    }

    return true;
  }
}
