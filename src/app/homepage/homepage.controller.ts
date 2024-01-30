import { Controller, Get } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { News } from 'src/entities/news.entity';

@ApiTags('app-homepage')
@Controller('app/homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @ApiOperation({
    description: `News are sorted by category names. 
    Can be filtrated by categoryId, to get only news from one category. 
    Also, can be seached by part of title or text from news.`,
  })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({
    name: 'filter.category.id',
    required: false,
    type: 'string',
    description: 'Accepts categoryId',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: 'string',
    description: 'By part of title or text',
  })
  @Get('/news-categories')
  async getNewsByCategories(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<News>> {
    return await this.homepageService.getNewsByCategories(query);
  }
}
