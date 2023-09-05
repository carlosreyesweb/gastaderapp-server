import { SessionEntity } from 'src/modules/sessions/entities/session.entity';

declare module 'express' {
  export interface Request {
    session?: SessionEntity;
  }
}

export { };

