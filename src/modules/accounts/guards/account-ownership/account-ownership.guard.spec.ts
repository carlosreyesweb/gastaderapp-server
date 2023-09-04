import { AccountOwnershipGuard } from './account-ownership.guard';

describe('AccountOwnershipGuard', () => {
  it('should be defined', () => {
    expect(new AccountOwnershipGuard()).toBeDefined();
  });
});
