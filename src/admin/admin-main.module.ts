import { Module } from '@nestjs/common';
import { AdminUserModule } from './user/admin-user.module';
import { AdminCategoryModule } from './category/admin-category.module';
import { AdminNewsModule } from './news/admin-news.module';
import { AdminPageModule } from './page/admin-page.module';
import { AdminDashboardModule } from './dashboard/admin-dashboard.module';

@Module({
  imports: [
    AdminUserModule,
    AdminCategoryModule,
    AdminNewsModule,
    AdminPageModule,
    AdminDashboardModule,
  ],
})
export class AdminMainModule {}
