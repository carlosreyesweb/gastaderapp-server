import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';

@Injectable()
export class ExchangeRatesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createExchangeRateDto: CreateExchangeRateDto) {
    return this.prismaService.exchangeRate.create({
      data: createExchangeRateDto,
    });
  }

  findAll() {
    return this.prismaService.exchangeRate.findMany();
  }

  findOne(id: number) {
    return this.prismaService.exchangeRate.findUnique({ where: { id } });
  }

  update(id: number, updateExchangeRateDto: UpdateExchangeRateDto) {
    return this.prismaService.exchangeRate.update({
      where: { id },
      data: updateExchangeRateDto,
    });
  }

  remove(id: number) {
    return this.prismaService.exchangeRate.delete({ where: { id } });
  }
}
