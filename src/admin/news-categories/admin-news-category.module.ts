import { Module } from '@nestjs/common';
import { AdminNewsCategoryService } from './admin-news-category.service';
import { AdminNewsCategoryController } from './admin-news-category.controller';
import { NewsCategory } from 'src/entities/news_category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NewsCategory])],
  controllers: [AdminNewsCategoryController],
  providers: [AdminNewsCategoryService],
})
export class AdminNewsCategoryModule {}
