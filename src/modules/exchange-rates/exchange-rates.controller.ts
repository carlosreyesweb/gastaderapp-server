import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExchangeRateEntity } from './entities/exchange-rate.entity';
import { ExchangeRateNotFoundException } from './exceptions/exchange-rate-not-found.exception';
import { ExchangeRatesService } from './exchange-rates.service';

@Controller('exchange-rates')
@ApiTags('Tasas de cambio')
@ApiBearerAuth()
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get()
  async findAll() {
    const exchangeRates = await this.exchangeRatesService.findAll();

    return exchangeRates.map(
      (exchangeRate) => new ExchangeRateEntity(exchangeRate),
    );
  }

  @Get(':exchangeRateId')
  async findOne(@Param('exchangeRateId', ParseIntPipe) exchangeRateId: number) {
    const exchangeRate =
      await this.exchangeRatesService.findOne(exchangeRateId);
    if (!exchangeRate) throw new ExchangeRateNotFoundException();

    return new ExchangeRateEntity(exchangeRate);
  }
}
