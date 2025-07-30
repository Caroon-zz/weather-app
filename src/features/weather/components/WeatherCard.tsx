import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { weatherCardStyles } from "../../../styles/weatherCard";
import { useWeatherByZip } from "../hooks/useWeather";
import type { WeatherCardProps } from "../types";

export const WeatherCard: React.FC<WeatherCardProps> = ({ 
  zip, 
  onDescription, 
  onWeatherCode 
}) => {
  const { weather, isLoading, error } = useWeatherByZip(zip);

  useEffect(() => {
    if (weather) {
      onDescription?.(weather.description);
      onWeatherCode?.(weather.weathercode);
    }
  }, [weather, onDescription, onWeatherCode]);

  if (isLoading) {
    return (
      <View style={[weatherCardStyles.card, weatherCardStyles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[weatherCardStyles.label, { marginTop: 12 }]}>Loading weather data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[weatherCardStyles.card, weatherCardStyles.errorContainer]}>
        <Text style={weatherCardStyles.errorText}>
          {error.message.includes('coordinates') 
            ? 'Invalid ZIP code. Please try again.' 
            : 'Failed to fetch weather data. Please try again.'}
        </Text>
      </View>
    );
  }

  if (!weather) {
    return null;
  }

  const formatValue = (value: number, precision: number = 2): string => {
    return value !== undefined ? Number(value).toPrecision(precision) : '--';
  };

  return (
    <View style={weatherCardStyles.card}>
      <Text style={weatherCardStyles.description}>
        {weather.description}
      </Text>
      
      <View style={weatherCardStyles.row}>
        <Text style={weatherCardStyles.label}>Temperature:</Text>
        <Text style={weatherCardStyles.value}>
          {formatValue(weather.temperature)}°C
        </Text>
      </View>
      
      <View style={weatherCardStyles.row}>
        <Text style={weatherCardStyles.label}>Wind Speed:</Text>
        <Text style={weatherCardStyles.value}>
          {formatValue(weather.windspeed)} km/h
        </Text>
      </View>
      
      <View style={weatherCardStyles.row}>
        <Text style={weatherCardStyles.label}>Weather Code:</Text>
        <Text style={weatherCardStyles.value}>
          {weather.weathercode}
        </Text>
      </View>
    </View>
  );
};
