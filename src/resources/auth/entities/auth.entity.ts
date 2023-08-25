import { UserEntity } from 'src/resources/users/entities/user.entity';

export class AuthEntity {
  user: UserEntity;
  token: string;

  constructor(partial: Partial<AuthEntity>) {
    Object.assign(this, partial);
  }
}
