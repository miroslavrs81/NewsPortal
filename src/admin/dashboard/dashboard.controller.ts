import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { User } from 'src/entities/user.entity';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

@ApiTags('admin-dashboard')
@ApiBearerAuth()
@Controller('admin/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

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
}
