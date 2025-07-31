import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useWeatherRedux } from "../redux/useWeatherRedux";
import { weatherCardStyles } from "../styles/weatherCard";
import type { WeatherCardProps } from "../types";

export const WeatherCard: React.FC<WeatherCardProps> = ({
  zip,
  onDescription,
  onWeatherCode,
}) => {
  const { weatherData, isLoading, error, fetchWeather } = useWeatherRedux();

  useEffect(() => {
    if (zip && zip.length === 5) {
      fetchWeather(zip);
    }
  }, [zip, fetchWeather]);

  useEffect(() => {
    if (weatherData) {
      onDescription?.(weatherData.description);
      onWeatherCode?.(weatherData.weathercode);
    }
  }, [weatherData, onDescription, onWeatherCode]);

  if (isLoading) {
    return (
      <View
        style={[weatherCardStyles.card, weatherCardStyles.loadingContainer]}
      >
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[weatherCardStyles.label, { marginTop: 12 }]}>
          Loading weather data...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[weatherCardStyles.card, weatherCardStyles.errorContainer]}>
        <Text style={weatherCardStyles.errorText}>
          {error.includes("coordinates")
            ? "Invalid ZIP code. Please try again."
            : "Failed to fetch weather data. Please try again."}
        </Text>
      </View>
    );
  }

  if (!weatherData) {
    return null;
  }

  const formatValue = (value: number, precision: number = 2): string => {
    return value !== undefined ? Number(value).toPrecision(precision) : "--";
  };

  return (
    <View style={weatherCardStyles.card}>
      <Text style={weatherCardStyles.description}>
        {weatherData.description}
      </Text>

      <View style={weatherCardStyles.row}>
        <Text style={weatherCardStyles.label}>Temperature:</Text>
        <Text style={weatherCardStyles.value}>
          {formatValue(weatherData.temperature)}°C
        </Text>
      </View>

      <View style={weatherCardStyles.row}>
        <Text style={weatherCardStyles.label}>Wind Speed:</Text>
        <Text style={weatherCardStyles.value}>
          {formatValue(weatherData.windspeed)} km/h
        </Text>
      </View>

      <View style={weatherCardStyles.row}>
        <Text style={weatherCardStyles.label}>Weather Code:</Text>
        <Text style={weatherCardStyles.value}>{weatherData.weathercode}</Text>
      </View>
    </View>
  );
};
