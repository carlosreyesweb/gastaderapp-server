import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';

@Injectable()
export class ExchangeRatesService {
  constructor(private prisma: PrismaService) {}

  create(createExchangeRateDto: CreateExchangeRateDto) {
    return this.prisma.exchangeRate.create({ data: createExchangeRateDto });
  }

  findAll() {
    return this.prisma.exchangeRate.findMany();
  }

  findOne(id: number) {
    return this.prisma.exchangeRate.findUnique({ where: { id } });
  }

  update(id: number, updateExchangeRateDto: UpdateExchangeRateDto) {
    return this.prisma.exchangeRate.update({
      where: { id },
      data: updateExchangeRateDto,
    });
  }

  remove(id: number) {
    return this.prisma.exchangeRate.delete({ where: { id } });
  }
}
