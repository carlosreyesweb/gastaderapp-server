import { Test, TestingModule } from '@nestjs/testing';
import { AccountsRepository } from './accounts.repository';

describe('AccountsRepository', () => {
  let provider: AccountsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsRepository],
    }).compile();

    provider = module.get<AccountsRepository>(AccountsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
