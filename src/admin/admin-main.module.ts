import { Module } from '@nestjs/common';
import { AdminUserModule } from './user/admin-user.module';
import { NewsCategoryModule } from './news-categories/news-category.module';

@Module({
  imports: [AdminUserModule, NewsCategoryModule],
})
export class AdminMainModule {}
