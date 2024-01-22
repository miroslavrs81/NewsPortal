import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin-pages')
@Controller('page')
export class PageController {
  @Get()
  @Render('page')
  root() {
    return { message: 'Hello world!' };
  }
}
