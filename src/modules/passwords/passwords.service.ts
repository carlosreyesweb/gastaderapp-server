import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PasswordsMismatchException } from './exceptions/passwords-mismatch.exception';

@Injectable()
export class PasswordsService {
  hash(password: string) {
    const SALT_ROUNDS = 12;
    return hash(password, SALT_ROUNDS);
  }

  async compare(password: string, passwordHash: string) {
    const result = await compare(password, passwordHash);
    if (!result) throw new PasswordsMismatchException();

    return result;
  }
}
