import axios from "axios";
import { fetchWeatherApi } from "openmeteo";
import { getWeatherDescription } from "../utils/weatherCodeToDescription";

const fetchLatLon = async (zip: string): Promise<{ lat: number; lon: number }> => {
  const res = await axios.get(`https://api.zippopotam.us/us/${zip}`);
  const { latitude, longitude } = res.data.places[0];
  return { lat: latitude, lon: longitude };
};

const fetchWeather = async (lat: string, lon: string): Promise<any> => {
  const params = {
    latitude: [parseFloat(lat)],
    longitude: [parseFloat(lon)],
    current: "temperature_2m,weather_code,wind_speed_10m"
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];
  const current = response.current();
  const temperature = current?.variables(0)?.value();
  const weathercode = current?.variables(1)?.value();
  const windspeed = current?.variables(2)?.value();
  return {
    temperature,
    weathercode,
    windspeed,
    description: getWeatherDescription(weathercode)
  };
};

export { fetchLatLon, fetchWeather };

