import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminPageService } from './admin-page.service';
import { AdminDashboardService } from '../dashboard/admin-dashboard.service';
import { AdminRoleGuard } from 'src/guards/admin-role.guard';

@ApiTags('admin-pages')
@ApiBearerAuth()
@UseGuards(AdminRoleGuard)
@Controller('/admin')
export class AdminPageController {
  constructor(
    private readonly pageService: AdminPageService,
    private readonly dashboardService: AdminDashboardService,
  ) {}

  @Get('/about')
  @Render('about.ejs')
  getAboutPage() {
    return this.pageService.getAboutPage();
  }

  @Get('/dashboard')
  @Render('dashboard.ejs')
  async getDashboardPage() {
    const totals = await this.dashboardService.getTotals();
    return {
      title: 'Dashboard',
      totals,
    };
  }
}
