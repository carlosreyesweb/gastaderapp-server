import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RequestWithUser } from 'src/common/types/request-with-user.type';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const user = request.user;
    if (!user || user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'No estás autorizado para realizar esta acción.',
      );
    }

    return true;
  }
}
