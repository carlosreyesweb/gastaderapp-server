import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrenciesService } from './currencies.service';
import { CurrencyEntity } from './entities/currency.entity';
import { CurrencyNotFoundException } from './exceptions/currency-not-found.exception';

@Controller('currencies')
@ApiTags('Monedas')
@ApiBearerAuth()
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  async findAll() {
    const currencies = await this.currenciesService.findAll();

    return currencies.map((currency) => new CurrencyEntity(currency));
  }

  @Get(':currencyId')
  async findOne(@Param('currencyId', ParseIntPipe) currencyId: number) {
    const currency = await this.currenciesService.findOne(currencyId);
    if (!currency) throw new CurrencyNotFoundException();

    return new CurrencyEntity(currency);
  }
}
