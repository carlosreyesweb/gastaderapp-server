import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { OwnershipViolationException } from 'src/modules/users/exceptions/ownership-violation.exception';
import { AuthService } from '../../auth.service';
import { SessionEntity } from '../../entities/session.entity';

@Injectable()
export class SessionOwnershipGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<
      ExtendedRequest<{
        user: UserEntity;
        session?: SessionEntity;
      }>
    >();

    const sessionId = +request.params.id;
    const session = await this.authService.findSession(sessionId);

    const userId = request.user.id;

    const owns = session.userId === userId;
    if (!owns) {
      throw new OwnershipViolationException('No eres el dueño de esta sesión.');
    }

    request.session = session;

    return true;
  }
}
