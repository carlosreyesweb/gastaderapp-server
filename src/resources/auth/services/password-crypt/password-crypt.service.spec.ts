import { Test, TestingModule } from '@nestjs/testing';
import { PasswordCryptService } from './password-crypt.service';

describe('PasswordCryptService', () => {
  let service: PasswordCryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordCryptService],
    }).compile();

    service = module.get<PasswordCryptService>(PasswordCryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
