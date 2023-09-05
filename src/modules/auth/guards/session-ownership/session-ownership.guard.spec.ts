import { SessionOwnershipGuard } from './session-ownership.guard';

describe('SessionOwnershipGuard', () => {
  it('should be defined', () => {
    expect(new SessionOwnershipGuard()).toBeDefined();
  });
});
