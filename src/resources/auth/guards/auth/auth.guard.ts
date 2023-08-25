import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from 'src/common/types/request-with-user.type';
import { UserNotFoundException } from 'src/resources/users/exceptions/user-not-found.exception';
import { UsersService } from 'src/resources/users/users.service';
import { AuthService } from '../../auth.service';
import { InvalidTokenException } from '../../exceptions/invalid-token.exception';
import { MissingAuthorizationException } from '../../exceptions/missing-authorization.exception';
import { MissingSessionException } from '../../exceptions/missing-session.exception';
import { NoTokenException } from '../../exceptions/no-token.exception';
import { TokenExpiredException } from '../../exceptions/token-expired.exception';
import { JWTPayload } from '../../types/jwt-payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly users: UsersService,
    private readonly auth: AuthService,
    private readonly jwt: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;
    if (!authorization) throw new MissingAuthorizationException();

    const token = authorization.replace('Bearer ', '');
    if (!token) throw new NoTokenException();

    const decoded = this.jwt.decode(token) as JWTPayload | null;
    if (!decoded) throw new InvalidTokenException();
    if (!decoded.userId) throw new InvalidTokenException();
    const { userId } = decoded;

    const user = await this.users.findOne(userId);
    if (!user) {
      throw new UserNotFoundException(
        'El usuario que intentas autenticar no existe.',
      );
    }

    const session = await this.auth.findSession(userId);
    if (!session) throw new MissingSessionException();

    try {
      await this.jwt.verifyAsync(token, {
        secret: session.secret,
        ignoreExpiration: false,
      });
    } catch (error) {
      if (error.expiredAt) {
        await this.auth.deleteSession(userId);
        throw new TokenExpiredException();
      }
      throw new InvalidTokenException();
    }

    request.user = user;

    return true;
  }
}
