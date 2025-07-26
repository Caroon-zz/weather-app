import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, TextInput } from "react-native";
import { WeatherButton } from "./common/weatherButton";
import { Weather } from "./components/weather";
import styles from "./styles/indexStyle";
import { getWeatherEmoji } from "./utils/weatherEmoji";

const queryClient = new QueryClient();

const AwesomeWeather = () => {
  const navigation = useNavigation();
 
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
 
  const [zipCode, setZipCode] = useState("");
  const [submittedZip, setSubmittedZip] = useState("");
  const [weatherDesc, setWeatherDesc] = useState<string>("");
  const [weatherCode, setWeatherCode] = useState<number>();
  const handleZipChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 5);
    setZipCode(cleaned);
  };
  const isValidZip = zipCode.length === 5;
  
  return (
    <QueryClientProvider client={queryClient}>
      <LinearGradient
        colors={["#e3f0ff", "#b3d1f7", "#0057b8"]}
        style={styles.container}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Text style={styles.title}>Weather</Text>
        {weatherCode !== undefined ? (
          <AnimatedWeatherEmoji code={weatherCode} desc={weatherDesc} />
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Enter ZIP code"
          value={zipCode}
          onChangeText={handleZipChange}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
          maxLength={5}
        />
        <WeatherButton
          title="Get Weather"
          onPress={() => setSubmittedZip(zipCode)}
          color="#007AFF"
          disabled={!isValidZip}
          style={styles.buttonWrapper}
        />
        {submittedZip ?
          <Weather 
            zip={submittedZip} 
            onDescription={setWeatherDesc} 
            onWeatherCode={setWeatherCode} /> : null}
      </LinearGradient>
    </QueryClientProvider>
  );
};
export default AwesomeWeather;

const AnimatedWeatherEmoji = ({ code, desc }: { code: number; desc: string }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const flyAnim = useRef(new Animated.Value(-200)).current;

 useEffect(() => {
    spinAnim.setValue(0);
    flyAnim.setValue(-200);
    Animated.parallel([
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(flyAnim, {
        toValue: 0,
        duration: 1700,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      })
    ]).start();
  }, [code, spinAnim, flyAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Text
      style={[styles.emoji, { transform: [{ rotate: spin }, { translateX: flyAnim }] }]}
      accessibilityLabel={desc}
    >
      {getWeatherEmoji(code)}
    </Animated.Text>
  );
};