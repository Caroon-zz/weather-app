import { useQuery } from "@tanstack/react-query";
import { fetchLatLon, fetchWeather } from "../services/weatherService";
import type { Coordinates, WeatherData } from "../types";

export const useCoordinates = (zipCode: string) => {
  return useQuery<Coordinates, Error>({
    queryKey: ["coordinates", zipCode],
    queryFn: () => fetchLatLon(zipCode),
    enabled: !!zipCode && zipCode.length === 5,
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });
};

export const useWeatherData = (coordinates?: Coordinates) => {
  return useQuery<WeatherData, Error>({
    queryKey: ["weather", coordinates?.lat, coordinates?.lon],
    queryFn: () => 
      coordinates 
        ? fetchWeather(String(coordinates.lat), String(coordinates.lon))
        : Promise.reject(new Error("No coordinates provided")),
    enabled: !!coordinates,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
};

export const useWeatherByZip = (zipCode: string) => {
  const { 
    data: coordinates, 
    error: coordinatesError, 
    isLoading: coordinatesLoading 
  } = useCoordinates(zipCode);

  const { 
    data: weather, 
    error: weatherError, 
    isLoading: weatherLoading 
  } = useWeatherData(coordinates);

  return {
    weather,
    coordinates,
    isLoading: coordinatesLoading || weatherLoading,
    error: coordinatesError || weatherError,
  };
};
