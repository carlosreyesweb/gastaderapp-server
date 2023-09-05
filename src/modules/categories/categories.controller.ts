import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { CategoriesService } from './categories.service';
import { Category } from './decorators/category.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryOwnershipGuard } from './guards/category-ownership/category-ownership.guard';

@Controller('categories')
@ApiTags('Categorías')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@User() user: UserEntity, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(user.id, dto);
  }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.categoriesService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(CategoryOwnershipGuard)
  findOne(@Category() category: CategoryEntity) {
    return category;
  }

  @Patch(':id')
  @UseGuards(CategoryOwnershipGuard)
  update(@Category() category: CategoryEntity, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(category.id, dto);
  }

  @Delete(':id')
  @UseGuards(CategoryOwnershipGuard)
  remove(@Category() category: CategoryEntity) {
    return this.categoriesService.remove(category.id);
  }
}
