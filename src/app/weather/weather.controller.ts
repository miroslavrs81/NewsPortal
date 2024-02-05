import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiTags } from '@nestjs/swagger';
import { WeatherResponseType } from 'src/types/weather-response.type';

@ApiTags('app-weather')
@Controller('app/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/:city')
  async getWeather(@Param('city') city: string): Promise<WeatherResponseType> {
    return this.weatherService.getWeather(city);
  }
}
