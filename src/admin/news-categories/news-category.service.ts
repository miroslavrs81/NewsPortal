import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsCategory } from 'src/entities/news_category.entity';
import { Repository } from 'typeorm';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

@Injectable()
export class NewsCategoryService {
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
}
