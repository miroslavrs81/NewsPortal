import { Module } from '@nestjs/common';
import { AdminNewsService } from './admin-news.service';
import { AdminNewsController } from './admin-news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';
import { Image } from 'src/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News, Category, User, Image])],
  controllers: [AdminNewsController],
  providers: [AdminNewsService],
})
export class AdminNewsModule {}
