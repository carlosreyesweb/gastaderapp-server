import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { AccountEntity } from '../entities/account.entity';

export const Account = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<ExtendedRequest<{ account: AccountEntity }>>();

    return request.account;
  },
);
