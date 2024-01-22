import { Module } from '@nestjs/common';
import { PageController } from './admin-page.controller';

@Module({
  controllers: [PageController],
})
export class PageModule {}
