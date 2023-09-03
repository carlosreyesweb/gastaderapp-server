import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class ExchangeRatesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.ExchangeRateCreateInput) {
    return this.prismaService.exchangeRate.create({
      data,
    });
  }

  findAll() {
    return this.prismaService.exchangeRate.findMany();
  }

  findOne(id: number) {
    return this.prismaService.exchangeRate.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.ExchangeRateUpdateInput) {
    return this.prismaService.exchangeRate.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prismaService.exchangeRate.delete({ where: { id } });
  }
}
