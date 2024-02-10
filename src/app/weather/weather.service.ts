import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch weather data. Status code: ${response.status}`,
        );
      }
      const weatherData: WeatherResponseType = {
        cityName: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main,
        windSpeed: response.data.wind.speed,
      };
      return weatherData;
    } catch (error) {
      const typedError = error as { response?: { status?: number } };

      if (typedError.response && typedError.response.status === 404) {
        throw new HttpException(
          `City not found: ${city}`,
          HttpStatus.NOT_FOUND,
        );
      } else if (typedError.response && typedError.response.status === 401) {
        throw new HttpException(`Invalid API key`, HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException(
          `Failed to fetch weather data: ${returnMessages.SomethingWentWrong}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
