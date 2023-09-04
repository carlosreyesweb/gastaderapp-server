import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from 'src/common/types/extended-request.type';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ExtendedRequest>();
    return data ? request.signedCookies[data] : request.signedCookies;
  },
);
