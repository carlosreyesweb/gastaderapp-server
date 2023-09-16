import { TransactionOwnershipGuard } from './transaction-ownership.guard';

describe('TransactionOwnershipGuard', () => {
  it('should be defined', () => {
    expect(new TransactionOwnershipGuard()).toBeDefined();
  });
});
