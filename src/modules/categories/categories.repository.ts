import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from '../prisma/prisma.repository';

@Injectable()
export class CategoriesRepository {
  private readonly include: Prisma.CategoryInclude = {
    transactions: true,
  };

  constructor(private readonly prismaRepository: PrismaRepository) {}

  create(data: Prisma.CategoryCreateInput) {
    return this.prismaRepository.category.create({ data });
  }

  findAll(where?: Prisma.CategoryWhereInput) {
    return this.prismaRepository.category.findMany({
      where,
      include: { user: true },
    });
  }

  findOne(id: number) {
    return this.prismaRepository.category.findUnique({
      where: { id },
      include: this.include,
    });
  }

  update(id: number, data: Prisma.CategoryUpdateInput) {
    return this.prismaRepository.category.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  remove(id: number) {
    return this.prismaRepository.category.delete({
      where: { id },
    });
  }
}
