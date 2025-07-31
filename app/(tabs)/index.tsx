import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { AnimatedWeatherEmoji, WeatherButton } from "../../src/components";
import { ZIP_CODE_LENGTH } from "../../src/constants/globalConstants";
import { useSettingsRedux } from "../../src/features/settings/redux/useSettingsRedux";
import { WeatherCard } from "../../src/features/weather/components/WeatherCard";
import { useWeatherRedux } from "../../src/features/weather/redux/useWeatherRedux";
import { useTabBarPadding } from "../../src/hooks/useTabBar";
import { weatherTabStyles } from "../../src/styles/weatherTabStyles";

const WeatherApp = () => {
  const navigation = useNavigation();
  const tabBarPadding = useTabBarPadding();

  const {
    zipCode,
    submittedZip,
    weatherData,
    isLoading,
    error,
    updateZipCode,
    fetchWeather,
  } = useWeatherRedux();

  const { unitSystem } = useSettingsRedux();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleZipChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, ZIP_CODE_LENGTH);
    updateZipCode(cleaned);
  };

  const isValidZip = zipCode.length === ZIP_CODE_LENGTH;

  const handleGetWeather = () => {
    if (isValidZip) {
      fetchWeather(zipCode);
    }
  };

  return (
    <LinearGradient
      colors={["#e3f0ff", "#b3d1f7", "#0057b8"]}
      style={[weatherTabStyles.container, tabBarPadding]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <Text style={weatherTabStyles.title}>Weather</Text>

      <View style={weatherTabStyles.emojiContainer}>
        {submittedZip && weatherData && !isLoading ? (
          <AnimatedWeatherEmoji
            code={weatherData.weathercode}
            desc={weatherData.description}
          />
        ) : null}
      </View>

      <TextInput
        style={weatherTabStyles.input}
        placeholder="Enter ZIP code"
        value={zipCode}
        onChangeText={handleZipChange}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
        maxLength={ZIP_CODE_LENGTH}
      />

      <WeatherButton
        title={isLoading ? "Loading..." : "Get Weather"}
        onPress={handleGetWeather}
        color="#007AFF"
        disabled={!isValidZip || isLoading}
        style={weatherTabStyles.buttonWrapper}
      />

      {submittedZip && !isLoading && (
        <WeatherCard 
          zip={submittedZip} 
          unitSystem={unitSystem}
        />
      )}

      {error && (
        <View style={weatherTabStyles.errorContainer}>
          <Text style={weatherTabStyles.errorText}>{error}</Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default WeatherApp;
