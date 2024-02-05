import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';
import { WeatherResponseType } from 'src/types/weather-response.type';

@Injectable()
export class WeatherService {
  private readonly apiKey = process.env.OPENWEATHERMAP_API_KEY;

  async getWeather(city: string): Promise<WeatherResponseType> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    try {
      const response = await axios.get(apiUrl);

      const weatherData: WeatherResponseType = {
        cityName: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main,
        windSpeed: response.data.wind.speed,
      };
      return weatherData;
    } catch (error) {
      throw new Error(
        `Failed to fetch weather data: ${returnMessages.SomethingWentWrong}`,
      );
    }
  }
}
