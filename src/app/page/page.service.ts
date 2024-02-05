import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class PageService {
  async getPage() {
    try {
      return await fs.promises.readFile('page.txt', 'utf8');
    } catch (err) {
      console.error('Error reading page.txt:', err);
      throw err;
    }
  }
}
