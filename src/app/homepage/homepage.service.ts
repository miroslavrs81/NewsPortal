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
      relations: ['category'],
      sortableColumns: ['id'],
      defaultSortBy: [['category.name', 'ASC']],
      select: [
        'news.title',
        'SUBSTRING_INDEX(news.text, ".", 1) as truncatedText',
        'category.name',
      ],
    };
    const qb = this.newsRepository.createQueryBuilder('news');
    return await paginate<News>(query, qb, paginateConfig);
  }

  async getAllNewsWithImages(query: PaginateQuery): Promise<Paginated<News>> {
    const paginateConfig: PaginateConfig<News> = {
      defaultLimit: 20,
      relations: ['images', 'category'],
      sortableColumns: ['id'],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['title', 'text'],
      select: ['title', 'createdAt', 'text'],
      filterableColumns: { 'category.id': [FilterOperator.EQ] },
    };
    const qb = this.newsRepository.createQueryBuilder('news');
    return await paginate<News>(query, qb, paginateConfig);
  }
}
