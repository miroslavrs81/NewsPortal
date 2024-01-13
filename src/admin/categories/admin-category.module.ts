import { Module } from '@nestjs/common';
import { AdminCategoryService } from './admin-category.service';
import { AdminCategoryController } from './admin-category.controller';
import { Category } from 'src/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [AdminCategoryController],
  providers: [AdminCategoryService],
})
export class AdminCategoryModule {}
