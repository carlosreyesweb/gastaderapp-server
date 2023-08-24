import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class PasswordCryptService {
  hashPassword(password: string) {
    const SALT_ROUNDS = 12;
    return hash(password, SALT_ROUNDS);
  }

  comparePasswords(password: string, passwordHash: string) {
    return compare(password, passwordHash);
  }
}
