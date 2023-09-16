import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { OwnershipViolationException } from 'src/modules/users/exceptions/ownership-violation.exception';
import { CategoriesService } from '../../categories.service';

@Injectable()
export class CategoryOwnershipGuard implements CanActivate {
  constructor(private readonly categoriesService: CategoriesService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const id = +request.params.id;
    const category = await this.categoriesService.findOne(id);

    const owns = category.userId === request.userId;
    if (!owns) {
      throw new OwnershipViolationException(
        'No eres el dueño de esta categoría.',
      );
    }

    request.category = category;

    return true;
  }
}
