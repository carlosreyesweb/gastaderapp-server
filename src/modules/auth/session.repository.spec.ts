import { Test, TestingModule } from '@nestjs/testing';
import { SessionRepository } from './session-repository';

describe('SessionRepository', () => {
  let provider: SessionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionRepository],
    }).compile();

    provider = module.get<SessionRepository>(SessionRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
