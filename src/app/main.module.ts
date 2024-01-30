import { Module } from '@nestjs/common';
import { HomepageModule } from './homepage/homepage.module';

@Module({
  imports: [HomepageModule],
})
export class MainModule {}
