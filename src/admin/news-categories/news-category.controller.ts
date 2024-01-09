import { Controller, Post, Body } from '@nestjs/common';
import { NewsCategoryService } from './news-category.service';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NewsCategory } from 'src/entities/news_category.entity';

@ApiTags('admin-news-category')
@ApiBearerAuth()
@Controller('/admin/news-categories')
export class NewsCategoryController {
  constructor(private readonly newsCategoriesService: NewsCategoryService) {}

  @Post()
  async createNewsCategory(
    @Body() createCategoryDto: CreateNewsCategoryDto,
  ): Promise<NewsCategory> {
    return await this.newsCategoriesService.createNewsCategory(
      createCategoryDto,
    );
  }
}
