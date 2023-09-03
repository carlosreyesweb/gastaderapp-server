import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<ExtendedRequest<{ user: UserEntity }>>();

    const user = request.user;
    if (!user || user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'No estás autorizado para realizar esta acción.',
      );
    }

    return true;
  }
}
