import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsRepository } from './transactions.repository';

describe('TransactionsRepository', () => {
  let provider: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsRepository],
    }).compile();

    provider = module.get<TransactionsRepository>(TransactionsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
