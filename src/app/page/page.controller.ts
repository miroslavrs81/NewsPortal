import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app-page')
@Controller('/')
export class PageController {
  @Get('/')
  @Render('homePage.ejs')
  gethomepagePage() {
    return { title: 'Home page' };
  }

  @Get('/about')
  @Render('about.ejs')
  getAboutUsPage() {
    return { title: 'About Us' };
  }

  @Get('/dashboard')
  @Render('dashboard.ejs')
  getDashboardPage() {
    return { title: 'Dashboard' };
  }
}
