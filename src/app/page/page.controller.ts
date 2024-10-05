import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app-page')
@Controller('/')
export class PageController {
  @Get('/page')
  @Render('page.ejs')
  getAboutUsPage() {}
}
