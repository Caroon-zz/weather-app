
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Weather } from "./components/weather";
import { getWeatherEmoji } from "./utils/weatherEmoji";

export const title = "Weather App";
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
          <Text style={{ fontSize: 64, marginBottom: 8 }} accessibilityLabel={weatherDesc}>
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
          <Text style={{ color: "#d00", marginBottom: 8 }}>Enter a valid 5-digit ZIP code</Text>
        )}
        <View style={styles.buttonWrapper}>
          <Button
            title="Get Weather"
            onPress={() => setSubmittedZip(zipCode)}
            color="#007AFF"
            disabled={!isValidZip}
          />
        </View>
        {submittedZip ? <Weather zip={submittedZip} onDescription={setWeatherDesc} onWeatherCode={setWeatherCode} /> : null}
      </LinearGradient>
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#e3f0ff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 32,
    letterSpacing: 1.5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    width: 240,
    marginBottom: 18,
    backgroundColor: "#fff",
    fontSize: 18,
    color: "#222",
    textAlign: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonWrapper: {
    width: 240,
    marginBottom: 24,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
});