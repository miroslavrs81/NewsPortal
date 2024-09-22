export type WeatherResponseType = {
  cityName: string;
  country: string;
  temperature: number;
  feelsLike?: number;
  tempMin: number;
  tempMax: number;
  windSpeed: number;
  cloudiness: number;
  coordinates?: {
    lon: number;
    lat: number;
  };
  pressure?: number;
  humidity?: number;
  seaLevel?: number;
  groundLevel?: number;
  visibility?: number;
  sunrise?: number;
  sunset?: number;
};
