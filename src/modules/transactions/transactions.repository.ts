import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from '../prisma/prisma.repository';

@Injectable()
export class TransactionsRepository {
  private readonly include: Prisma.TransactionInclude = {
    account: true,
    category: true,
  };

  constructor(private readonly prismaRepository: PrismaRepository) {}

  create(data: Prisma.TransactionCreateInput) {
    return this.prismaRepository.transaction.create({
      data,
      include: this.include,
    });
  }

  findAll() {
    return this.prismaRepository.transaction.findMany({
      include: this.include,
    });
  }

  findOne(id: number) {
    return this.prismaRepository.transaction.findUnique({
      where: { id },
      include: this.include,
    });
  }

  update(id: number, data: Prisma.TransactionUpdateInput) {
    return this.prismaRepository.transaction.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  remove(id: number) {
    return this.prismaRepository.transaction.delete({ where: { id } });
  }
}
