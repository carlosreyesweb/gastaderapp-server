import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { UserEntity } from '../../entities/user.entity';
import { OwnershipViolationException } from '../../exceptions/ownership-violation.exception';

@Injectable()
export class UserOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<ExtendedRequest<{ user: UserEntity }>>();

    const can = +request.params.userId === request.user?.id;
    if (!can) {
      throw new OwnershipViolationException(
        'No eres el dueño de este usuario.',
      );
    }

    return true;
  }
}
