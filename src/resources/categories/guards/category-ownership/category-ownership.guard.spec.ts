import { CategoryOwnershipGuard } from './category-ownership.guard';

describe('CategoryOwnershipGuard', () => {
  it('should be defined', () => {
    expect(new CategoryOwnershipGuard()).toBeDefined();
  });
});
