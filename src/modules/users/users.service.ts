import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { PasswordsService } from '../passwords/passwords.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UsersService {
  private readonly users;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordsService: PasswordsService,
  ) {
    this.users = this.prismaService.user;
  }

  async create(dto: RegisterDto) {
    const { name, username, email, password } = dto;

    const existentByEmail = await this.users.findUnique({
      where: { email },
    });
    if (existentByEmail) throw new UserAlreadyExistsException(email);
    const existentByUsername = await this.users.findUnique({
      where: { username },
    });
    if (existentByUsername) throw new UserAlreadyExistsException(username);

    const passwordHash = await this.passwordsService.hash(password);

    const user = await this.users.create({
      data: { name, username, email, passwordHash },
    });

    return new UserEntity(user);
  }

  async findAll() {
    const users = await this.users.findMany();

    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: number) {
    const user = await this.users.findUnique({ where: { id } });
    if (!user) throw new UserNotFoundException();

    return new UserEntity(user);
  }

  async findByEmail(email: string) {
    const user = await this.users.findUnique({ where: { email } });
    if (!user) {
      throw new UserNotFoundException(
        `El usuario con email ${email} no existe.`,
      );
    }

    return new UserEntity(user);
  }

  async findByUsername(username: string) {
    const user = await this.users.findUnique({
      where: { username },
    });
    if (!user) {
      throw new UserNotFoundException(`El usuario ${username} no existe.`);
    }

    return new UserEntity(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const { password, name, email, username } = dto;

    if (email) {
      const existentByEmail = await this.users.findUnique({
        where: { email },
      });
      if (existentByEmail && existentByEmail.id !== id) {
        throw new UserAlreadyExistsException(email);
      }
    }

    if (username) {
      const existentByUsername = await this.users.findUnique({
        where: { username },
      });
      if (existentByUsername && existentByUsername.id !== id) {
        throw new UserAlreadyExistsException(username);
      }
    }

    let passwordHash: string | undefined;
    if (password) {
      passwordHash = await this.passwordsService.hash(password);
    }

    const updated = await this.users.update({
      where: { id },
      data: {
        name,
        email,
        username,
        passwordHash,
      },
    });

    return new UserEntity(updated);
  }

  async remove(id: number) {
    await this.users.delete({ where: { id } });
  }
}
