import { Test, TestingModule } from '@nestjs/testing';
import { PrismaRepository } from './prisma.repository';

describe('PrismaRepository', () => {
  let service: PrismaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaRepository],
    }).compile();

    service = module.get<PrismaRepository>(PrismaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
