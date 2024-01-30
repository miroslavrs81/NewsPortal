import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { News } from 'src/entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HomepageService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async getNewsByCategories(query: PaginateQuery): Promise<Paginated<News>> {
    const paginateConfig: PaginateConfig<News> = {
      defaultLimit: 20,
      relations: ['category', 'author'],
      sortableColumns: ['id', 'datetime'],
      defaultSortBy: [['category.category', 'DESC']],
      searchableColumns: ['title', 'text'],
      select: [
        'id',
        'title',
        'text',
        'datetime',
        'author.id',
        'category.id',
        'category.category',
      ],
      filterableColumns: { 'category.id': [FilterOperator.EQ] },
    };
    const qb = this.newsRepository
      .createQueryBuilder('news')
      .leftJoin('news.category', 'categories.id');
    return await paginate<News>(query, qb, paginateConfig);
  }
}
