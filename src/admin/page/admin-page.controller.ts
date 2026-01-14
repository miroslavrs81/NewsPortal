import {
  Body,
  Post,
  Controller,
  Get,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminPageService } from './admin-page.service';
import { AdminDashboardService } from '../dashboard/admin-dashboard.service';
import { AdminRoleGuard } from 'src/guards/admin-role.guard';
import { CreatePageProfileDto } from './dto/create-pageProfile.dto';
import { PageProfile } from 'src/entities/page-profile.entity';
import { UpdatePageProfileDto } from './dto/update-pageProfile.dto';

@ApiTags('admin-pages')
@ApiBearerAuth()
@UseGuards(AdminRoleGuard)
@Controller('/admin')
export class AdminPageController {
  constructor(
    private readonly pageService: AdminPageService,
    private readonly dashboardService: AdminDashboardService,
  ) {}

  @Get('/dashboard')
  async getDashboardPage() {
    const totals = await this.dashboardService.getTotals();
    return {
      title: 'Dashboard',
      totals,
    };
  }

  @Get('/about')
  async getAboutPage() {
    return this.pageService.findPageProfileByTitle('About');
  }

  @Post('/page')
  async createPage(
    @Body() pageProfileDto: CreatePageProfileDto,
  ): Promise<PageProfile> {
    return this.pageService.createPage(pageProfileDto);
  }

  @Get('/page/allPages')
  async findAllPages(): Promise<PageProfile[]> {
    return this.pageService.findAllPages();
  }

  @Get('/page/:id')
  async findOne(@Param('id') id: number): Promise<PageProfile> {
    return this.pageService.findOne(Number(id));
  }

  @Put('/page/:id')
  async updatePage(
    @Param('id') id: number,
    @Body() updatePageDto: UpdatePageProfileDto,
  ): Promise<PageProfile> {
    return this.pageService.updatePage(Number(id), updatePageDto);
  }

  @Delete('/page/:id')
  async removePage(@Param('id') id: number): Promise<void> {
    return this.pageService.removePage(Number(id));
  }
}
