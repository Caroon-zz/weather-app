import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  clearWeatherData,
  fetchWeatherRequest,
  setZipCode,
} from "../slices/weatherSlice";

export const useWeatherRedux = () => {
  const dispatch = useAppDispatch();
  const weatherState = useAppSelector((state) => state.weather);

  const updateZipCode = useCallback(
    (zipCode: string) => {
      dispatch(setZipCode(zipCode));
    },
    [dispatch],
  );

  const fetchWeather = useCallback(
    (zipCode?: string, lat?: number, lon?: number) => {
      dispatch(fetchWeatherRequest({ zipCode, lat, lon }));
    },
    [dispatch],
  );

  const clearWeather = useCallback(() => {
    dispatch(clearWeatherData());
  }, [dispatch]);

  const isLoading =
    weatherState.isLoadingCoordinates || weatherState.isLoadingWeather;
  const error = weatherState.coordinatesError || weatherState.weatherError;

  return {
    zipCode: weatherState.zipCode,
    submittedZip: weatherState.submittedZip,
    coordinates: weatherState.coordinates,
    weatherData: weatherState.weatherData,
    isLoading,
    error,
    updateZipCode,
    fetchWeather,
    clearWeather,
  };
};
