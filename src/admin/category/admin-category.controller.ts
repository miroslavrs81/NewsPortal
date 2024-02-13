import {
  Controller,
  Post,
  Body,
  Delete,
  HttpCode,
  ParseIntPipe,
  Param,
  Put,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Category } from 'src/entities/category.entity';
import { AdminCategoryService } from './admin-category.service';
import { AdminRoleGuard } from 'src/guards/admin-role.guard';

@ApiTags('admin-categories')
@ApiBearerAuth()
@UseGuards(AdminRoleGuard)
@Controller('/admin/categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: AdminCategoryService) {}

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Put('/:id')
  async updateCategoryTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.updateCategoryTitle(
      +id,
      updateCategoryDto,
    );
  }

  @Get('/')
  async getCategoryList(
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
  ): Promise<{
    category: Category[];
    count: number;
  }> {
    return await this.categoryService.getCategoryList(sortOrder);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.categoryService.deleteCategory(id);
  }
}
