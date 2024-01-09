import {
  Controller,
  Post,
  Body,
  Delete,
  HttpCode,
  ParseIntPipe,
  Param,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { NewsCategoryService } from './news-category.service';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NewsCategory } from 'src/entities/news_category.entity';

@ApiTags('admin-news-category')
@ApiBearerAuth()
@Controller('/admin/news-categories')
export class NewsCategoryController {
  constructor(private readonly newsCategoryService: NewsCategoryService) {}

  @Post()
  async createNewsCategory(
    @Body() createCategoryDto: CreateNewsCategoryDto,
  ): Promise<NewsCategory> {
    return await this.newsCategoryService.createNewsCategory(createCategoryDto);
  }

  @Put('/:id')
  async updateCategoryTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: CreateNewsCategoryDto,
  ): Promise<NewsCategory> {
    return await this.newsCategoryService.updateCategoryTitle(
      +id,
      updateCategoryDto,
    );
  }

  @Get('/')
  async getCategoryList(
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{
    category: NewsCategory[];
    count: number;
  }> {
    return await this.newsCategoryService.getCategoryList(sortOrder);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.newsCategoryService.deleteCategory(id);
  }
}
