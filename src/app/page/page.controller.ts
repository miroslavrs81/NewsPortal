import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminPageService } from 'src/admin/page/admin-page.service';

@ApiTags('app-page')
@Controller('/')
export class PageController {
  constructor(private readonly pageService: AdminPageService) {}

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
}
