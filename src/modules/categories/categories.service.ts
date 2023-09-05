import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryNotFoundException } from './exceptions/category-not-found.exception';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(userId: number, dto: CreateCategoryDto) {
    const { name, description, color } = dto;

    const category = await this.categoriesRepository.create({
      name,
      description,
      color,
      user: { connect: { id: userId } },
    });

    return new CategoryEntity(category);
  }

  async findAll(userId: number) {
    const categories = await this.categoriesRepository.findAll({ userId });

    return categories.map((category) => new CategoryEntity(category));
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne(id);
    if (!category) throw new CategoryNotFoundException();

    return new CategoryEntity(category);
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const updated = await this.categoriesRepository.update(id, dto);

    return new CategoryEntity(updated);
  }

  async remove(id: number) {
    await this.categoriesRepository.remove(id);
  }
}
