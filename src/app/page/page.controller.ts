import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminPageService } from 'src/admin/page/admin-page.service';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

@ApiTags('pages')
@Controller('api/pages')
export class PageController {
  constructor(private readonly pageService: AdminPageService) {}

  @Get('/')
  gethomepagePage() {
    return { title: 'Home page', message: returnMessages.ApiIsRunning };
  }

  @Get('/about')
  getAboutUsPage() {
    return this.pageService.getAboutPage();
  }
}
