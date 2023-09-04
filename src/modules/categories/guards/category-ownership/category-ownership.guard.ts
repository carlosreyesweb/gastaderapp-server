import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { OwnershipViolationException } from 'src/modules/users/exceptions/ownership-violation.exception';
import { CategoriesService } from '../../categories.service';
import { CategoryEntity } from '../../entities/category.entity';
import { CategoryNotFoundException } from '../../exceptions/category-not-found.exception';

@Injectable()
export class CategoryOwnershipGuard implements CanActivate {
  constructor(private readonly categoriesService: CategoriesService) {}

  async canActivate(context: ExecutionContext) {
    const request: ExtendedRequest<{
      user: UserEntity;
      category?: CategoryEntity;
    }> = context.switchToHttp().getRequest();

    const categoryId = +request.params.categoryId;
    const category = await this.categoriesService.findOne(categoryId);
    if (!category) throw new CategoryNotFoundException();

    const userId = request.user?.id;

    const owns = category.userId === userId;
    if (!owns) {
      throw new OwnershipViolationException(
        'No eres el dueño de esta categoría.',
      );
    }

    request.category = category;

    return true;
  }
}
