import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminUserService } from './admin-user.service';
import { AdminRoleGuard } from 'src/guards/admin-role.guard';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('admin-users')
@ApiBearerAuth()
@UseGuards(AdminRoleGuard)
@Controller('/admin/users')
export class AdminUserController {
  constructor(private readonly userService: AdminUserService) {}

  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'search', required: false, type: 'string' })
  @ApiQuery({
    name: 'filter.isActive',
    required: false,
    type: 'string',
    description: 'Accepts 1 or 0 (as true or false)',
  })
  @Get()
  async getUsersList(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<User>> {
    return await this.userService.getUsersList(query);
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(userId, updateUserDto);
  }
}
