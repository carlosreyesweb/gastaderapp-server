import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TransactionEntity } from '../entities/transaction.entity';

export const Transaction = createParamDecorator(
  (data: keyof TransactionEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.transaction?.[data] ?? request.transaction;
  },
);
