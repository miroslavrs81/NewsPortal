import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { News } from 'src/entities/news.entity';
import { Category } from 'src/entities/category.entity';
import { AdminPageService } from 'src/admin/page/admin-page.service';
import { PageProfile } from 'src/entities/page-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PageProfile, User, News, Category])],
  controllers: [PageController],
  providers: [AdminPageService],
})
export class PageModule {}
