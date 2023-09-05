import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRatesRepository } from './exchange-rates.repository';

describe('ExchangeRatesRepository', () => {
  let provider: ExchangeRatesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeRatesRepository],
    }).compile();

    provider = module.get<ExchangeRatesRepository>(ExchangeRatesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
