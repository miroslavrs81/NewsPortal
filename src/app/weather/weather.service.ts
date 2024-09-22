import { Injectable } from '@nestjs/common';
import { fetchWeatherData } from 'src/helpers/fetch-weather-data.helper';
import { WeatherResponseType } from 'src/types/weather-response.type';

@Injectable()
export class WeatherService {
  async getWeather(city: string): Promise<WeatherResponseType> {
    const data = await fetchWeatherData(city);

    return {
      cityName: data.cityName,
      country: data.country,
      temperature: data.temperature,
      tempMin: data.tempMin,
      tempMax: data.tempMax,
      windSpeed: data.windSpeed,
      cloudiness: data.cloudiness,
    };
  }

  async getAllWeatherData(city: string) {
    return await fetchWeatherData(city);
  }
}
