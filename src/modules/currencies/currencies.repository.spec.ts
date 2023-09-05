import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesRepository } from './currencies.repository';

describe('CurrenciesRepository', () => {
  let provider: CurrenciesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesRepository],
    }).compile();

    provider = module.get<CurrenciesRepository>(CurrenciesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
