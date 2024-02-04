import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

@Injectable()
export class WeatherService {
  private readonly apiKey = process.env.OPENWEATHERMAP_API_KEY;
  async getWeather(city: string) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch weather data: ${returnMessages.SomethingWentWrong}`,
      );
    }
  }
}
