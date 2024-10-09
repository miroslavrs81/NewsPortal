import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin-pages')
@Controller('/admin')
export class AdminPageController {
  @Get('/')
  @Render('homePage')
  getHomePage() {
    return { title: 'Home page' };
  }

  @Get('/about')
  @Render('about.ejs')
  getAboutPage() {
    return {
      title: 'About us',
      teamMembers: [
        {
          name: 'Miroslav Ilic',
          position: 'CEO',
          fb: '',
        },
        {
          name: 'Milos Stefanovic',
          position: 'CTO',
          fb: '',
        },
        {
          name: 'Micko Tomic',
          position: 'Marketing Director',
          fb: '',
        },
      ],
    };
  }
}
