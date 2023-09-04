import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CurrenciesService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.currency.findMany();
  }

  findOne(id: number) {
    return this.prismaService.currency.findUnique({ where: { id } });
  }
}
