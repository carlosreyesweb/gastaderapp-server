import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestWithUser } from 'src/common/types/request-with-user.type';
import { OwnershipViolationException } from '../../exceptions/ownership-violation.exception';

@Injectable()
export class UserOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    const can = +request.params.userId === request.user?.id;
    if (!can) {
      throw new OwnershipViolationException(
        'No eres el dueño de este usuario.',
      );
    }

    return true;
  }
}
