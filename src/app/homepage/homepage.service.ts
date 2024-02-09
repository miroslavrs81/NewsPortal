import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
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
      defaultSortBy: [['category.category', 'ASC']],
      select: [
        'news.title',
        'SUBSTRING_INDEX(news.text, ".", 1) as truncatedText',
        'category.category',
      ],
    };
    const qb = this.newsRepository.createQueryBuilder('news');
    return await paginate<News>(query, qb, paginateConfig);
  }

  async getAllNewsWithImages(): Promise<News[]> {
    return this.newsRepository.find({
      relations: ['images'],
    });
  }
}
