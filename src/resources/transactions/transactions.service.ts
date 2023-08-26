import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  private readonly include: Prisma.TransactionInclude = {
    account: true,
    category: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.prismaService.transaction.create({
      data: createTransactionDto,
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

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prismaService.transaction.update({
      where: { id },
      data: updateTransactionDto,
      include: this.include,
    });
  }

  remove(id: number) {
    return this.prismaService.transaction.delete({ where: { id } });
  }
}
