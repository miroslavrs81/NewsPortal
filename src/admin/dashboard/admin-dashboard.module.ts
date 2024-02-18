import { Module } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminDashboardController } from './admin-dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AdminCategoryService } from '../category/admin-category.service';
import { Category } from 'src/entities/category.entity';
import { News } from 'src/entities/news.entity';
import { Image } from 'src/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, News, Category, Image])],
  controllers: [AdminDashboardController],
  providers: [AdminDashboardService, AdminCategoryService],
})
export class AdminDashboardModule {}
