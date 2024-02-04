import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app-weather')
@Controller('app/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/:city')
  async getWeather(@Param('city') city: string) {
    return this.weatherService.getWeather(city);
  }
}
