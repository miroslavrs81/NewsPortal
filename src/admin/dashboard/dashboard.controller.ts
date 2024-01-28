import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { User } from 'src/entities/user.entity';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Category } from 'src/entities/category.entity';
import { AdminCategoryService } from '../category/admin-category.service';

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
  @Get('/users')
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
}
