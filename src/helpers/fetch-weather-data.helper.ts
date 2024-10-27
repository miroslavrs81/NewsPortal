import axios from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { returnMessages } from './error-message-mapper.helper';
import { WeatherResponseType } from 'src/types/weather-response.type';

export const fetchWeatherData = async (
  city: string,
): Promise<WeatherResponseType> => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const apiUrl = process.env.OPENWEATHERMAP_API_URL;

  if (!apiKey || !apiUrl) {
    throw new HttpException(
      returnMessages.ApiKeyOrBaseUrlMissing,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  const requestedUrl = `${apiUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await axios.get(requestedUrl);

    if (response.status !== 200) {
      throw new HttpException(
        returnMessages.FailedToFetchWeatherData + `(HTTP ${response.status})`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const data: WeatherResponseType = {
      cityName: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      tempMin: response.data.main.temp_min,
      tempMax: response.data.main.temp_max,
      windSpeed: response.data.wind.speed,
      cloudiness: response.data.clouds.all,
      coordinates: {
        lon: response.data.coord.lon,
        lat: response.data.coord.lat,
      },
      pressure: response.data.main.pressure,
      humidity: response.data.main.humidity,
      seaLevel: response.data.main.sea_level,
      groundLevel: response.data.main.grnd_level,
      visibility: response.data.visibility,
      sunrise: new Date(response.data.sys.sunrise * 1000),
      sunset: new Date(response.data.sys.sunset * 1000),
    };

    return data;
  } catch (error) {
    const typedError = error as { response?: { status?: number } };

    if (typedError.response && typedError.response.status === 404) {
      throw new HttpException(
        returnMessages.CityNotFound + `${city}`,
        HttpStatus.NOT_FOUND,
      );
    } else if (typedError.response && typedError.response.status === 401) {
      throw new HttpException(
        returnMessages.InvalidApiKey,
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      throw new HttpException(
        returnMessages.FailedToFetchWeatherData,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
};
