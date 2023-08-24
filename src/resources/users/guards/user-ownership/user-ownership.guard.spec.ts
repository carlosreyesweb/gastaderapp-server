import { UserOwnershipGuard } from './user-ownership.guard';

describe('UserOwnershipGuard', () => {
  it('should be defined', () => {
    expect(new UserOwnershipGuard()).toBeDefined();
  });
});
