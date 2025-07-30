import axios from "axios";
import { fetchWeatherApi } from "openmeteo";
import { API_ENDPOINTS, WEATHER_PARAMS } from "../../../constants/weather";
import type { Coordinates, WeatherApiParams, WeatherData, ZipCodeData } from "../types";
import { getWeatherDescription } from "../utils/weatherCodeToDescription";

export const fetchLatLon = async (zip: string): Promise<Coordinates> => {
  try {
    const response = await axios.get<ZipCodeData>(`${API_ENDPOINTS.ZIP_CODE}/${zip}`);
    const { latitude, longitude } = response.data.places[0];
    
    return { 
      lat: parseFloat(latitude), 
      lon: parseFloat(longitude) 
    };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw new Error(`Failed to fetch coordinates for ZIP code ${zip}`);
  }
};

export const fetchWeather = async (lat: string, lon: string): Promise<WeatherData> => {
  try {
    const params: WeatherApiParams = {
      latitude: [parseFloat(lat)],
      longitude: [parseFloat(lon)],
      current: WEATHER_PARAMS.CURRENT
    };

    const responses = await fetchWeatherApi(API_ENDPOINTS.WEATHER, params);
    const response = responses[0];
    const current = response.current();
    
    const temperature = current?.variables(0)?.value() ?? 0;
    const weathercode = current?.variables(1)?.value() ?? 0;
    const windspeed = current?.variables(2)?.value() ?? 0;

    return {
      temperature,
      weathercode,
      windspeed,
      description: getWeatherDescription(weathercode)
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error(`Failed to fetch weather data for coordinates ${lat}, ${lon}`);
  }
};
