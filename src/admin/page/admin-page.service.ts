import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminPageService {
  getAboutPage() {
    return {
      title: 'About',
      teamMembers: [
        {
          firstName: 'Miroslav',
          lastName: 'Ilic',
          position: 'CEO',
          github: 'https://github.com/miroslavrs81',
        },
        {
          firstName: 'Milos',
          lastName: 'Stefanovic',
          position: 'CTO',
          github: 'https://github.com/milosst94',
        },
        {
          firstName: 'Micko',
          lastName: 'Tomic',
          position: 'Marketing Director',
          github: 'https://github.com/mickotomic',
        },
      ],
    };
  }
}
