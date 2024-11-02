import { Module } from '@nestjs/common';
import { AdminPageController } from './admin-page.controller';
import { AdminPageService } from './admin-page.service';
import { AdminDashboardService } from '../dashboard/admin-dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { News } from 'src/entities/news.entity';
import { Category } from 'src/entities/category.entity';
import { PageProfile } from 'src/entities/page-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PageProfile, User, News, Category])],
  controllers: [AdminPageController],
  providers: [AdminPageService, AdminDashboardService],
})
export class AdminPageModule {}
