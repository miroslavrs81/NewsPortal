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
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NewsCategory } from 'src/entities/news_category.entity';
import { AdminNewsCategoryService } from './admin-news-category.service';

@ApiTags('admin-news-category')
@ApiBearerAuth()
@Controller('/admin/news-categories')
export class AdminNewsCategoryController {
  constructor(private readonly newsCategoryService: AdminNewsCategoryService) {}

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
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
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
