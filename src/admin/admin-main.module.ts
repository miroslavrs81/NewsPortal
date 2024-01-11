import { Module } from '@nestjs/common';
import { AdminUserModule } from './user/admin-user.module';
import { AdminNewsCategoryModule } from './news-categories/admin-news-category.module';

@Module({
  imports: [AdminUserModule, AdminNewsCategoryModule],
})
export class AdminMainModule {}
