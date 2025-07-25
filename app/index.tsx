import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Weather } from "./components/weather";
import styles from "./styles/indexStyle";
import { getWeatherEmoji } from "./utils/weatherEmoji";

const queryClient = new QueryClient();

export default function AwesomeWeather() {
  const navigation = useNavigation();
 
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
 
  const [zipCode, setZipCode] = useState("");
  const [submittedZip, setSubmittedZip] = useState("");
  const [zipTouched, setZipTouched] = useState(false);
  const [weatherDesc, setWeatherDesc] = useState<string>("");
  const [weatherCode, setWeatherCode] = useState<number>();
  const handleZipChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 5);
    setZipCode(cleaned);
    setZipTouched(true);
  };
  const isValidZip = zipCode.length === 5;
  return (
    <QueryClientProvider client={queryClient}>
      <LinearGradient
        colors={["#e3f0ff", "#b3d1f7"]}
        style={styles.container}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Text style={styles.title}>Weather</Text>
        {weatherCode !== undefined ? (
          <Text style={styles.emoji} accessibilityLabel={weatherDesc}>
            {getWeatherEmoji(weatherCode)}
          </Text>
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
        {!isValidZip && zipTouched && (
          <Text style={styles.errorText}>Enter a valid 5-digit ZIP code</Text>
        )}
        <View style={styles.buttonWrapper}>
          <Button
            title="Get Weather"
            onPress={() => setSubmittedZip(zipCode)}
            color="#007AFF"
            disabled={!isValidZip}
          />
        </View>
        {submittedZip ?
        <Weather 
        zip={submittedZip} 
        onDescription={setWeatherDesc} 
        onWeatherCode={setWeatherCode} /> : null}
      </LinearGradient>
    </QueryClientProvider>
  );
}