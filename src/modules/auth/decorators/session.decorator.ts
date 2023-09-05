import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { SessionEntity } from '../entities/session.entity';

export const Session = createParamDecorator((ctx: ExecutionContext) => {
  const request = ctx
    .switchToHttp()
    .getRequest<ExtendedRequest<{ session: SessionEntity }>>();
  return request.session;
});
