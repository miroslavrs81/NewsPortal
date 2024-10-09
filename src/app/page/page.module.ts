import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { AdminDashboardService } from 'src/admin/dashboard/admin-dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { News } from 'src/entities/news.entity';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, News, Category])],
  controllers: [PageController],
  providers: [AdminDashboardService],
})
export class PageModule {}
