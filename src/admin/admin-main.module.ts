import { Module } from '@nestjs/common';
import { AdminUserModule } from './user/admin-user.module';
import { AdminCategoryModule } from './categories/admin-category.module';
import { AdminNewsModule } from './news/admin-news.module';
import { PageModule } from './page/admin-page.module';

@Module({
  imports: [AdminUserModule, AdminCategoryModule, AdminNewsModule, PageModule],
})
export class AdminMainModule {}
