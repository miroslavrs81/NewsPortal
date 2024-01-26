import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

@Injectable()
export class AdminCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      category: createCategoryDto.category,
    });
    if (category) {
      throw new BadRequestException(returnMessages.CategoryAlreadyExists);
    }
    return await this.categoryRepository.save(createCategoryDto);
  }

  async updateCategoryTitle(
    id: number,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      id,
    });
    if (!category) {
      throw new BadRequestException(returnMessages.CategoryNotFound);
    }

    category.category = updateCategoryDto.category;
    const updatedCategory = await this.categoryRepository.save(category);
    return updatedCategory;
  }

  async getCategoryList(sortOrder: 'ASC' | 'DESC'): Promise<{
    category: Category[];
    count: number;
  }> {
    const qb = this.categoryRepository.createQueryBuilder('categories');

    const [category, count] = await qb
      .orderBy('categories.id', sortOrder as 'ASC' | 'DESC')
      .getManyAndCount();
    return { category, count };
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({
      id,
    });
    if (!category) {
      throw new BadRequestException(returnMessages.CategoryNotFound);
    }
    await this.categoryRepository.remove(category);
  }
}
