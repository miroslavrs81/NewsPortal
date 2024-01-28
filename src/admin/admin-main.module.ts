import { Module } from '@nestjs/common';
import { AdminUserModule } from './user/admin-user.module';
import { AdminCategoryModule } from './category/admin-category.module';
import { AdminNewsModule } from './news/admin-news.module';
import { PageModule } from './page/admin-page.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    AdminUserModule,
    AdminCategoryModule,
    AdminNewsModule,
    PageModule,
    DashboardModule,
  ],
})
export class AdminMainModule {}
