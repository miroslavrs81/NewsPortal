import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin-pages')
@Controller('/admin')
export class AdminPageController {
  @Get('/page')
  root() {
    return {
      message:
        'Server has successfully started on port: ' + process.env.APP_PORT,
    };
  }
}
