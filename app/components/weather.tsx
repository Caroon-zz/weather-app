import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { fetchLatLon, fetchWeather } from "../api/index";
import weatherCardStyle from "../styles/weatherCardStyle";

type WeatherProps = {
  zip: string;
  onDescription?: (desc: string) => void;
  onWeatherCode?: (code: number) => void;
};

export function Weather({ zip, onDescription, onWeatherCode }: WeatherProps) {
  const { data: latLon, error: zipError, isLoading: zipLoading } = useQuery({
    queryKey: ["latlon", zip],
    queryFn: () => fetchLatLon(zip),
    enabled: !!zip,
  });

  const {
    data: weather,
    error: weatherError,
    isLoading: weatherLoading,
  } = useQuery({
    queryKey: ["weather", latLon?.lat, latLon?.lon],
    queryFn: () => latLon ? fetchWeather(latLon.lat, latLon.lon) : Promise.reject(),
    enabled: !!latLon,
  });

  useEffect(() => {
    if (weather) {
      if (onDescription) {
        onDescription(weather.description);
      }
      if (onWeatherCode && typeof weather.weathercode === 'number') {
        onWeatherCode(weather.weathercode);
      }
    }
  }, [weather, onDescription, onWeatherCode]);

  if (zipLoading) {
    return <ActivityIndicator />;
  }
  if (zipError) {
    return <Text>Invalid ZIP code.</Text>;
  }
  if (weatherLoading) {
    return <ActivityIndicator />;
  }
  if (weatherError) {
    return <Text>Weather fetch failed.</Text>;
  }
  if (!weather) {
    return null;
  }

  return (
    <View style={weatherCardStyle.card}>
      <Text style={weatherCardStyle.description}>{weather.description}</Text>
      <View style={weatherCardStyle.row}>
        <Text style={weatherCardStyle.label}>Temperature:</Text>
        <Text style={weatherCardStyle.value}>{weather.temperature !== undefined ? Number(weather.temperature).toPrecision(2) : '--'}°C</Text>
      </View>
      <View style={weatherCardStyle.row}>
        <Text style={weatherCardStyle.label}>Wind Speed:</Text>
        <Text style={weatherCardStyle.value}>{weather.windspeed !== undefined ? Number(weather.windspeed).toPrecision(2) : '--'} km/h</Text>
      </View>
      <View style={weatherCardStyle.row}>
        <Text style={weatherCardStyle.label}>Weather Code:</Text>
        <Text style={weatherCardStyle.value}>{weather.weathercode}</Text>
      </View>
    </View>
  );
}