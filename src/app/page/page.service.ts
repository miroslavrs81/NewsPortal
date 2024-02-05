import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class PageService {
  async getPage() {
    try {
      const data = await fs.promises.readFile('page.txt', 'utf8');
      return data;
    } catch (err) {
      console.error('Error reading page.txt:', err);
      throw err;
    }
  }
}
