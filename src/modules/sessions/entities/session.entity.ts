import { Session } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class SessionEntity implements Session {
  id: string;

  @Exclude()
  userId: number;

  user?: UserEntity;
  createdAt: Date;
  expiresAt: Date;

  constructor({ user, ...partial }: Partial<SessionEntity>) {
    Object.assign(this, partial);

    if (user) this.user = new UserEntity(user);
  }
}
