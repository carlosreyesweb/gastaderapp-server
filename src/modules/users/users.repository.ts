import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from '../prisma/prisma.repository';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaRepository: PrismaRepository) {}

  create(data: Prisma.UserCreateInput) {
    return this.prismaRepository.user.create({
      data,
    });
  }

  findAll(where?: Prisma.UserWhereInput) {
    return this.prismaRepository.user.findMany({ where });
  }

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prismaRepository.user.findUnique({
      where,
    });
  }

  update(id: number, data: Prisma.UserUpdateInput) {
    return this.prismaRepository.user.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prismaRepository.user.delete({ where: { id } });
  }
}
