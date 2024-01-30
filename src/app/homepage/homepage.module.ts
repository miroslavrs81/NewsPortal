import { Module } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { User } from 'src/entities/user.entity';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, News, Category])],
  controllers: [HomepageController],
  providers: [HomepageService],
})
export class HomepageModule {}
