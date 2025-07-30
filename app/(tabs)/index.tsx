import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { AnimatedWeatherEmoji, WeatherButton } from "../../src/components";
import { UI_CONSTANTS } from "../../src/constants/weather";
import { WeatherCard } from "../../src/features/weather";
import { useTabBarPadding } from "../../src/hooks/useTabBar";
import { homeStyles } from "../../src/styles/home";

const WeatherApp = () => {
  const navigation = useNavigation();
  const tabBarPadding = useTabBarPadding();
 
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
 
  const [zipCode, setZipCode] = useState("");
  const [submittedZip, setSubmittedZip] = useState("");
  const [weatherDesc, setWeatherDesc] = useState<string>("");
  const [weatherCode, setWeatherCode] = useState<number>();
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  
  const handleZipChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, UI_CONSTANTS.ZIP_CODE_LENGTH);
    setZipCode(cleaned);
  };
  
  const isValidZip = zipCode.length === UI_CONSTANTS.ZIP_CODE_LENGTH;

  const handleGetWeather = () => {
    setSubmittedZip(zipCode);
    setIsWeatherLoading(true);
    setWeatherCode(undefined);
    setWeatherDesc("");
  };

  const handleWeatherLoaded = (desc: string) => {
    setWeatherDesc(desc);
    setIsWeatherLoading(false);
  };

  const handleWeatherCodeLoaded = (code: number) => {
    setWeatherCode(code);
  };
  
  return (
    <LinearGradient
      colors={["#e3f0ff", "#b3d1f7", "#0057b8"]}
      style={[
        homeStyles.container,
        tabBarPadding
      ]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <Text style={homeStyles.title}>Weather</Text>
      
      <View style={homeStyles.emojiContainer}>
        {submittedZip && weatherCode !== undefined && !isWeatherLoading ? (
          <AnimatedWeatherEmoji code={weatherCode} desc={weatherDesc} />
        ) : null}
      </View>
      
      <TextInput
        style={homeStyles.input}
        placeholder="Enter ZIP code"
        value={zipCode}
        onChangeText={handleZipChange}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
        maxLength={UI_CONSTANTS.ZIP_CODE_LENGTH}
      />
      
      <WeatherButton
        title="Get Weather"
        onPress={handleGetWeather}
        color="#007AFF"
        disabled={!isValidZip}
        style={homeStyles.buttonWrapper}
      />
      
      {submittedZip && (
        <WeatherCard 
          zip={submittedZip} 
          onDescription={handleWeatherLoaded} 
          onWeatherCode={handleWeatherCodeLoaded} 
        />
      )}
    </LinearGradient>
  );
};

export default WeatherApp;