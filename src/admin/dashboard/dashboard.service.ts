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
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async getUsersList(query: PaginateQuery): Promise<Paginated<User>> {
    const paginateConfig: PaginateConfig<User> = {
      defaultLimit: 50,
      sortableColumns: ['id'],
      relations: [],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['name', 'email'],
      select: [
        'id',
        'name',
        'email',
        'isActive',
        'role',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'emailVerifiedAt',
      ],
      filterableColumns: { role: [FilterOperator.EQ] },
    };
    const qb = this.userRepository.createQueryBuilder('users');
    return await paginate<User>(query, qb, paginateConfig);
  }

  async getNewsList(query: PaginateQuery): Promise<Paginated<News>> {
    const paginateConfig: PaginateConfig<News> = {
      defaultLimit: 20,
      relations: ['category', 'author', 'images'],
      sortableColumns: ['id', 'datetime'],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['title', 'text'],
      select: [
        'id',
        'title',
        'text',
        'datetime',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'author.id',
        'author.name',
        'category.id',
        'category.category',
        'images.id',
        'images.name',
      ],
      filterableColumns: { 'category.id': [FilterOperator.EQ] },
    };
    const qb = this.newsRepository
      .createQueryBuilder('news')
      .select(paginateConfig.select);

    return await paginate<News>(query, qb, paginateConfig);
  }
}
