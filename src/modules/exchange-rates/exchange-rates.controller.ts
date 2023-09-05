import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExchangeRatesService } from './exchange-rates.service';

@Controller('exchange-rates')
@ApiTags('Tasas de cambio')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get()
  findAll() {
    return this.exchangeRatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exchangeRatesService.findOne(id);
  }
}
