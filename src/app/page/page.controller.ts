import { Controller, Get } from '@nestjs/common';
import { PageService } from './page.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app-page')
@Controller('/page')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @Get('/')
  async getPage() {
    return await this.pageService.getPage();
  }
}
