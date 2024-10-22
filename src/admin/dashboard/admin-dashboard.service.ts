import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { Category } from 'src/entities/category.entity';
import { News } from 'src/entities/news.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getUsersList(query: PaginateQuery): Promise<Paginated<User>> {
    const paginateConfig: PaginateConfig<User> = {
      defaultLimit: +process.env.DEFAULT_LIMIT,
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
      defaultLimit: +process.env.DEFAULT_LIMIT,
      relations: ['category', 'author', 'images'],
      sortableColumns: ['id', 'createdAt'],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['title', 'text'],
      select: [
        'id',
        'title',
        'text',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'author.id',
        'author.name',
        'category.id',
        'category.name',
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

  async getTotals() {
    const totalUsers = await this.userRepository.count();
    const totalNews = await this.newsRepository.count();
    const totalCategories = await this.categoryRepository.count();

    return {
      totalUsers,
      totalNews,
      totalCategories,
    };
  }
}
