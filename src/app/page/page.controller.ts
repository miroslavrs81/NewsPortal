import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminDashboardService } from 'src/admin/dashboard/admin-dashboard.service';
import { AdminPageService } from 'src/admin/page/admin-page.service';

@ApiTags('app-page')
@Controller('/')
export class PageController {
  constructor(
    private readonly dashboardService: AdminDashboardService,
    private readonly pageService: AdminPageService,
  ) {}

  @Get('/')
  @Render('homePage.ejs')
  gethomepagePage() {
    return { title: 'Home page' };
  }

  @Get('/about')
  @Render('about.ejs')
  getAboutUsPage() {
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
