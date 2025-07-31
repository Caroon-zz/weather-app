import { useEffect } from "react";
import { useWeatherRedux } from "../redux/useWeatherRedux";
import type { Coordinates } from "../types";

export const useCoordinates = (zipCode: string) => {
  const { coordinates, isLoading, error, fetchWeather } = useWeatherRedux();

  useEffect(() => {
    if (zipCode && zipCode.length === 5) {
      fetchWeather(zipCode);
    }
  }, [zipCode, fetchWeather]);

  return {
    data: coordinates,
    isLoading,
    error,
  };
};

export const useWeatherData = (coordinates?: Coordinates) => {
  const { weatherData, isLoading, error } = useWeatherRedux();

  return {
    data: weatherData,
    isLoading,
    error,
  };
};

export const useWeatherByZip = (zipCode: string) => {
  const { weatherData, coordinates, isLoading, error, fetchWeather } =
    useWeatherRedux();

  useEffect(() => {
    if (zipCode && zipCode.length === 5) {
      fetchWeather(zipCode);
    }
  }, [zipCode, fetchWeather]);

  return {
    weather: weatherData,
    coordinates,
    isLoading,
    error,
  };
};
