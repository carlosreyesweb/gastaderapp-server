import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { CategoryEntity } from '../entities/category.entity';

export const Category = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<ExtendedRequest<{ category: CategoryEntity }>>();

    return request.category;
  },
);
