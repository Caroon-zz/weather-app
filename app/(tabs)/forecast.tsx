import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useTabBarPadding } from "../../src/hooks/useTabBar";
import { weatherTabStyles } from "../../src/styles/weatherTabStyles";

export default function ForecastScreen() {
  const tabBarPadding = useTabBarPadding();

  return (
    <LinearGradient
      colors={["#e3f0ff", "#b3d1f7", "#0057b8"]}
      style={[weatherTabStyles.container, tabBarPadding]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <Text style={weatherTabStyles.title}>7-Day Forecast</Text>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            Coming Soon!
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Extended weather forecast feature will be available here.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
