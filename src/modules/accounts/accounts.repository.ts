import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from '../prisma/prisma.repository';

@Injectable()
export class AccountsRepository {
  private readonly include: Prisma.AccountInclude = {
    currency: true,
  };

  constructor(private readonly prismaRepository: PrismaRepository) {}

  create(data: Prisma.AccountCreateInput) {
    return this.prismaRepository.account.create({
      data,
      include: this.include,
    });
  }

  findAll(where?: Prisma.AccountWhereInput) {
    return this.prismaRepository.account.findMany({
      where,
      include: this.include,
    });
  }

  findOne(where: Prisma.AccountWhereUniqueInput) {
    return this.prismaRepository.account.findUnique({
      where,
      include: {
        ...this.include,
        transactions: { take: 10, orderBy: { createdAt: 'desc' } },
      },
    });
  }

  update(id: number, data: Prisma.AccountUpdateInput) {
    return this.prismaRepository.account.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  remove(id: number) {
    return this.prismaRepository.account.delete({ where: { id } });
  }
}
