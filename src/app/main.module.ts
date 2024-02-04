import { Module } from '@nestjs/common';
import { HomepageModule } from './homepage/homepage.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [HomepageModule, WeatherModule],
})
export class MainModule {}
