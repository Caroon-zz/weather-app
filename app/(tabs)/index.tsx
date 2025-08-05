import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, TextInput, View } from "react-native";
import { AnimatedWeatherEmoji, WeatherButton } from "../../src/components";
import { ZIP_CODE_LENGTH } from "../../src/constants/globalConstants";
import { useSettingsRedux } from "../../src/features/settings/redux/useSettingsRedux";
import { WeatherCard } from "../../src/features/weather/components/WeatherCard";
import { useWeatherRedux } from "../../src/features/weather/redux/useWeatherRedux";
import { useTabBarPadding } from "../../src/hooks/useTabBar";
import { weatherTabStyles } from "../../src/styles/weatherTabStyles";
import { fetchGeolocationCoordinates } from "../../src/utils/fetchGeolocationCoordinates";

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

  const handleUseMyLocation = async () => {
    const coordinates = await fetchGeolocationCoordinates();
    if (coordinates) {
      fetchWeather(undefined, coordinates.latitude, coordinates.longitude);
    }
  };

  const renderWeatherButton = () => (
    <View>
      <WeatherButton
        title={isLoading ? "Loading..." : "Get Weather"}
        onPress={handleGetWeather}
        color="#007AFF"
        disabled={!isValidZip || isLoading}
        style={weatherTabStyles.buttonWrapper}
      />
      <WeatherButton
        title="Use My Location"
        onPress={handleUseMyLocation}
        color="#34A853"
        disabled={isLoading}
        style={weatherTabStyles.buttonWrapper}
      />
    </View>
  );

  const renderWeatherEmoji = () => (
    <View style={weatherTabStyles.emojiContainer}>
      {weatherData && !isLoading ? (
        <AnimatedWeatherEmoji
          code={weatherData.weathercode}
          desc={weatherData.description}
        />
      ) : null}
    </View>
  );

  const renderZipInput = () => (
    <TextInput
      style={weatherTabStyles.input}
      placeholder="Enter ZIP code"
      value={zipCode}
      onChangeText={handleZipChange}
      keyboardType="numeric"
      placeholderTextColor="#aaa"
      maxLength={ZIP_CODE_LENGTH}
    />
  );

  const renderWeatherCard = () => {
    if (isLoading) {
      return <LoadingBox />;
    }

    if (weatherData) {
      return (
        <WeatherCard
          zip={submittedZip || "Current Location"}
          unitSystem={unitSystem}
        />
      );
    }

    return null;
  };

  const LoadingBox = () => {
    const spinAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ]),
      ).start();
    }, [spinAnim, pulseAnim]);

    const spin = spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <View style={weatherTabStyles.loadingBox}>
        <Animated.Image
          source={require("../../assets/images/icons/clear_4x.png")}
          style={[
            weatherTabStyles.emoji,
            {
              transform: [{ rotate: spin }, { scale: pulseAnim }],
            },
          ]}
        />
      </View>
    );
  };

  const renderTitle = () => <Text style={weatherTabStyles.title}>Weather</Text>;

  const renderError = () =>
    error && (
      <View style={weatherTabStyles.errorContainer}>
        <Text style={weatherTabStyles.errorText}>{error}</Text>
      </View>
    );

  return (
    <LinearGradient
      colors={["#e3f0ff", "#b3d1f7", "#0057b8"]}
      style={[weatherTabStyles.container, tabBarPadding]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {renderTitle()}
      {renderWeatherEmoji()}
      {renderZipInput()}
      {renderWeatherButton()}
      {renderWeatherCard()}
      {renderError()}
    </LinearGradient>
  );
};

export default WeatherApp;
