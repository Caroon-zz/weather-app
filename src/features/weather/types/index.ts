export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherData {
  temperature: number;
  weathercode: number;
  windspeed: number;
  description: string;
}

export interface ZipCodeData {
  places: {
    latitude: string;
    longitude: string;
  }[];
}

export interface WeatherApiParams {
  latitude: number[];
  longitude: number[];
  current: string;
}

export interface WeatherCardProps {
  zip: string;
  onDescription?: (desc: string) => void;
  onWeatherCode?: (code: number) => void;
  unitSystem?: "metric" | "imperial";
}

export interface AnimatedWeatherEmojiProps {
  code: number;
  desc: string;
}
