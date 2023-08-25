import { Request } from 'express';
import { UserEntity } from 'src/resources/users/entities/user.entity';

export type RequestWithUser = Request & { user?: UserEntity };
