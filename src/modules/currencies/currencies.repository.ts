import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma/prisma.repository';

@Injectable()
export class CurrenciesRepository {
  constructor(private readonly prismaRepository: PrismaRepository) {}

  findAll() {
    return this.prismaRepository.currency.findMany();
  }

  findOne(id: number) {
    return this.prismaRepository.currency.findUnique({ where: { id } });
  }
}
