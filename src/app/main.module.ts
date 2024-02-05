import { Module } from '@nestjs/common';
import { HomepageModule } from './homepage/homepage.module';
import { WeatherModule } from './weather/weather.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [HomepageModule, WeatherModule, PageModule],
})
export class MainModule {}
