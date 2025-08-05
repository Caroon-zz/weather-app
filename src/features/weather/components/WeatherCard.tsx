import React from "react";
import { Text, View } from "react-native";
import {
  convertTemperature,
  convertWindSpeed,
  getTemperatureUnit,
  getWindSpeedUnit,
} from "../../../utils/unitConversions";
import { useWeatherRedux } from "../redux/useWeatherRedux";
import { weatherCardStyles } from "../styles/weatherCard";
import type { WeatherCardProps } from "../types";

const WeatherCardComponent: React.FC<WeatherCardProps> = ({
  unitSystem = "metric",
}) => {
  const { weatherData } = useWeatherRedux();

  if (!weatherData) {
    return null;
  }

  return (
    <View style={weatherCardStyles.card}>
      <Text style={weatherCardStyles.description}>
        {weatherData.description}
      </Text>

      <View style={weatherCardStyles.row}>
        <Text style={weatherCardStyles.label}>Temperature:</Text>
        <Text style={weatherCardStyles.value}>
          {Math.round(convertTemperature(weatherData.temperature, unitSystem))}
          {getTemperatureUnit(unitSystem)}
        </Text>
      </View>

      <View style={weatherCardStyles.row}>
        <Text style={weatherCardStyles.label}>Wind Speed:</Text>
        <Text style={weatherCardStyles.value}>
          {convertWindSpeed(weatherData.windspeed, unitSystem).toFixed(1)}{" "}
          {getWindSpeedUnit(unitSystem)}
        </Text>
      </View>

      <View style={weatherCardStyles.row}>
        <Text style={weatherCardStyles.label}>Weather Code:</Text>
        <Text style={weatherCardStyles.value}>{weatherData.weathercode}</Text>
      </View>
    </View>
  );
};

export const WeatherCard = React.memo(WeatherCardComponent);
