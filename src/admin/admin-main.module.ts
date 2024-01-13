import { Module } from '@nestjs/common';
import { AdminUserModule } from './user/admin-user.module';
import { AdminCategoryModule } from './categories/admin-category.module';
import { AdminNewsModule } from './news/admin-news.module';

@Module({
  imports: [AdminUserModule, AdminCategoryModule, AdminNewsModule],
})
export class AdminMainModule {}
