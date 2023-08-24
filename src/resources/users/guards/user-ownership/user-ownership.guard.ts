import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { OwnershipViolationException } from 'src/common/exceptions/ownership-violation.exception';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: Request & { user?: UserEntity } = context
      .switchToHttp()
      .getRequest();

    const can = +request.params.userId === request.user?.id;
    if (!can) {
      throw new OwnershipViolationException(
        'No eres el dueño de este usuario.',
      );
    }

    return true;
  }
}
