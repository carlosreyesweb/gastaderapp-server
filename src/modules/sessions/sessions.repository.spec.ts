import { Test, TestingModule } from '@nestjs/testing';
import { SessionsRepository } from './session.repository';

describe('SessionsRepository', () => {
  let provider: SessionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionsRepository],
    }).compile();

    provider = module.get<SessionsRepository>(SessionsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
