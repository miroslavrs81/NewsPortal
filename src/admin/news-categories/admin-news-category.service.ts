import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsCategory } from 'src/entities/news_category.entity';
import { Repository } from 'typeorm';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

@Injectable()
export class AdminNewsCategoryService {
  constructor(
    @InjectRepository(NewsCategory)
    private newsCategoryRepository: Repository<NewsCategory>,
  ) {}

  async createNewsCategory(
    createCategoryDto: CreateNewsCategoryDto,
  ): Promise<NewsCategory> {
    const category = await this.newsCategoryRepository.findOneBy({
      category: createCategoryDto.category,
    });
    if (category) {
      throw new BadRequestException(returnMessages.CategoryAlreadyExists);
    }
    return await this.newsCategoryRepository.save(createCategoryDto);
  }

  async updateCategoryTitle(
    id: number,
    updateCategoryDto: CreateNewsCategoryDto,
  ): Promise<NewsCategory> {
    const category = await this.newsCategoryRepository.findOneBy({
      id,
    });
    if (!category) {
      throw new BadRequestException(returnMessages.CategoryNotFound);
    }

    category.category = updateCategoryDto.category;
    const updatedCategory = await this.newsCategoryRepository.save(category);
    return updatedCategory;
  }

  async getCategoryList(sortOrder: 'ASC' | 'DESC'): Promise<{
    category: NewsCategory[];
    count: number;
  }> {
    const qb = this.newsCategoryRepository.createQueryBuilder('categories');

    const [category, count] = await qb
      .orderBy('categories.category', sortOrder as 'ASC' | 'DESC')
      .getManyAndCount();
    return { category, count };
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.newsCategoryRepository.findOneBy({
      id,
    });
    if (!category) {
      throw new BadRequestException(returnMessages.CategoryNotFound);
    }
    await this.newsCategoryRepository.remove(category);
  }
}
