import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AccountEntity } from '../entities/account.entity';

export const Account = createParamDecorator(
  (data: keyof AccountEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return request.account?.[data] ?? request.account;
  },
);
