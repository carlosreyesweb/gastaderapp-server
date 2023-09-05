import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { PasswordCryptService } from '../auth/services/password-crypt/password-crypt.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordCryptService: PasswordCryptService,
  ) {}

  async create(dto: RegisterDto) {
    const { name, username, email, password } = dto;

    const existentByEmail = await this.usersRepository.findOne({ email });
    if (existentByEmail) throw new UserAlreadyExistsException(email);

    const existentByUsername = await this.usersRepository.findOne({ username });
    if (existentByUsername) throw new UserAlreadyExistsException(username);

    const passwordHash = await this.passwordCryptService.hashPassword(password);

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      passwordHash,
    });

    return new UserEntity(user);
  }

  async findAll() {
    const users = await this.usersRepository.findAll();

    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) throw new UserNotFoundException();

    return new UserEntity(user);
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new UserNotFoundException(
        `El usuario con email ${email} no existe.`,
      );
    }

    return new UserEntity(user);
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new UserNotFoundException(`El usuario ${username} no existe.`);
    }

    return new UserEntity(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const { password, name, email, username } = dto;

    if (email) {
      const existentByEmail = await this.usersRepository.findOne({ email });
      if (existentByEmail && existentByEmail.id !== id) {
        throw new UserAlreadyExistsException(email);
      }
    }

    if (username) {
      const existentByUsername = await this.usersRepository.findOne({
        username,
      });
      if (existentByUsername && existentByUsername.id !== id) {
        throw new UserAlreadyExistsException(username);
      }
    }

    let passwordHash: string | undefined;
    if (password) {
      passwordHash = await this.passwordCryptService.hashPassword(password);
    }

    const updated = await this.usersRepository.update(id, {
      name,
      email,
      username,
      passwordHash,
    });

    return new UserEntity(updated);
  }

  async remove(id: number) {
    await this.usersRepository.remove(id);
  }
}
