import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AdminCategoryService } from '../category/admin-category.service';
import { Category } from 'src/entities/category.entity';
import { News } from 'src/entities/news.entity';
import { Image } from 'src/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, News, Category, Image])],
  controllers: [DashboardController],
  providers: [DashboardService, AdminCategoryService],
})
export class DashboardModule {}
