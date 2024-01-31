import { Controller, Get } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { News } from 'src/entities/news.entity';

@ApiTags('app-homepage')
@Controller('app/homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get('/news-categories')
  async getNewsByCategories(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<News>> {
    return await this.homepageService.getNewsByCategories(query);
  }
}
