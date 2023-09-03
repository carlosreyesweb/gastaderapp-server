import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { User } from '../users/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { CategoriesService } from './categories.service';
import { Category } from './decorators/category.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryOwnershipGuard } from './guards/category-ownership/category-ownership.guard';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @User() user: UserEntity,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const { name, description, color } = createCategoryDto;

    const category = await this.categoriesService.create({
      name,
      description,
      color,
      user: { connect: { id: user.id } },
    });

    return new CategoryEntity(category);
  }

  @Get()
  async findAll(@User() user: UserEntity) {
    const categories = await this.categoriesService.findAllByUser(user.id);

    return categories.map((category) => new CategoryEntity(category));
  }

  @Get(':categoryId')
  @UseGuards(CategoryOwnershipGuard)
  findOne(@Category() category: CategoryEntity) {
    return new CategoryEntity(category);
  }

  @Patch(':categoryId')
  @UseGuards(CategoryOwnershipGuard)
  async update(
    @Category() category: CategoryEntity,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const { name, description, color } = updateCategoryDto;

    const updated = await this.categoriesService.update(category.id, {
      name,
      description,
      color,
    });

    return new CategoryEntity(updated);
  }

  @Delete(':categoryId')
  @UseGuards(CategoryOwnershipGuard)
  remove(@Category() category: CategoryEntity) {
    return this.categoriesService.remove(category.id);
  }
}
