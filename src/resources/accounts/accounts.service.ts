import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  private readonly include: Prisma.AccountInclude = {
    currency: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateAccountDto & { userId: number }) {
    return this.prismaService.account.create({
      data,
      include: this.include,
    });
  }

  findAll(userId: number) {
    return this.prismaService.account.findMany({
      where: { userId },
      include: this.include,
    });
  }

  findOne(id: number) {
    return this.prismaService.account.findUnique({
      where: { id },
      include: {
        ...this.include,
        transactions: { take: 10, orderBy: { createdAt: 'desc' } },
      },
    });
  }

  findOneBy(where: Prisma.AccountWhereUniqueInput) {
    return this.prismaService.account.findUnique({
      where,
    });
  }

  update(id: number, data: UpdateAccountDto) {
    return this.prismaService.account.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  remove(id: number) {
    return this.prismaService.account.delete({ where: { id } });
  }
}
