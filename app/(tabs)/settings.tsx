import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Switch, Text, View } from "react-native";
import { useSettingsRedux } from "../../src/features/settings/redux/useSettingsRedux";
import { UnitSystem } from "../../src/features/settings/slices/settingsSlice";
import { useTabBarPadding } from "../../src/hooks/useTabBar";
import { settingsStyles } from "../../src/styles/settingsStyles";
import { weatherTabStyles } from "../../src/styles/weatherTabStyles";

export default function SettingsScreen() {
  const tabBarPadding = useTabBarPadding();
  const { unitSystem, updateUnitSystem } = useSettingsRedux();

  const handleUnitSystemToggle = (value: boolean) => {
    const newUnit: UnitSystem = value ? "imperial" : "metric";
    updateUnitSystem(newUnit);
  };

  return (
    <LinearGradient
      colors={["#e3f0ff", "#b3d1f7", "#0057b8"]}
      style={[weatherTabStyles.container, tabBarPadding]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <Text style={weatherTabStyles.title}>Settings</Text>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={settingsStyles.settingsContainer}>
          <View style={settingsStyles.settingItem}>
            <Text style={settingsStyles.settingLabel}>Units</Text>
            <View style={settingsStyles.unitToggleContainer}>
              <Text style={settingsStyles.unitLabel}>Metric</Text>
              <Switch
                value={unitSystem === "imperial"}
                onValueChange={handleUnitSystemToggle}
                trackColor={{ false: "#767577", true: "#007AFF" }}
                thumbColor={unitSystem === "imperial" ? "#ffffff" : "#f4f3f4"}
              />
              <Text style={settingsStyles.unitLabel}>Imperial</Text>
            </View>
          </View>

          <View style={settingsStyles.infoSection}>
            <Text style={settingsStyles.infoTitle}>About</Text>
            <Text style={settingsStyles.infoText}>Weather App v1.0.0</Text>
            <Text style={settingsStyles.infoText}>
              Built with Expo & React Native
            </Text>
            <Text style={settingsStyles.infoText}>
              Weather data by Open-Meteo
            </Text>
            <Text style={settingsStyles.infoText}>
              Weather code mapping inspired by weather-sense
              (github.com/erikflowers/weather-sense)
            </Text>
            <Text style={settingsStyles.infoText}>
              Weather icons by Airycons (airycons.com)
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
