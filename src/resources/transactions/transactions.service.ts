import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  private readonly include: Prisma.TransactionInclude = {
    account: true,
    category: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.TransactionCreateInput) {
    return this.prismaService.transaction.create({
      data,
      include: this.include,
    });
  }

  findAll() {
    return this.prismaService.transaction.findMany({
      include: this.include,
    });
  }

  findOne(id: number) {
    return this.prismaService.transaction.findUnique({
      where: { id },
      include: this.include,
    });
  }

  update(id: number, data: Prisma.TransactionUpdateInput) {
    return this.prismaService.transaction.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  remove(id: number) {
    return this.prismaService.transaction.delete({ where: { id } });
  }
}
