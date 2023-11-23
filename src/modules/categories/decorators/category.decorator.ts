import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CategoryEntity } from '../entities/category.entity';

export const Category = createParamDecorator(
  (data: keyof CategoryEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return request.category?.[data] ?? request.category;
  },
);
