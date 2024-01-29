import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { User } from 'src/entities/user.entity';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Category } from 'src/entities/category.entity';
import { AdminCategoryService } from '../category/admin-category.service';
import { News } from 'src/entities/news.entity';
import { AdminRoleGuard } from 'src/guards/admin-role.guard';

@UseGuards(AdminRoleGuard)
@ApiTags('admin-dashboard')
@ApiBearerAuth()
@Controller('admin/dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly categoryService: AdminCategoryService,
  ) {}

  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({
    name: 'filter.role',
    required: false,
    type: 'string',
    description: 'Accepts admin or user',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: 'string',
    description: 'By name or email',
  })
  @Get('/users-list')
  async getUsersList(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<User>> {
    return await this.dashboardService.getUsersList(query);
  }

  @Get('/category-list')
  async getCategoryList(
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
  ): Promise<{
    category: Category[];
    count: number;
  }> {
    return await this.categoryService.getCategoryList(sortOrder);
  }

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
  @Get('/news-list')
  async getNewsList(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<News>> {
    return await this.dashboardService.getNewsList(query);
  }
}
