import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useSettingsRedux } from "../../src/features/settings/redux/useSettingsRedux";
import { UnitSystem } from "../../src/features/settings/slices/settingsSlice";
import { useTabBarPadding } from "../../src/hooks/useTabBar";
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
        <View style={styles.settingsContainer}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Units</Text>
            <View style={styles.unitToggleContainer}>
              <Text style={styles.unitLabel}>Metric</Text>
              <Switch
                value={unitSystem === "imperial"}
                onValueChange={handleUnitSystemToggle}
                trackColor={{ false: "#767577", true: "#007AFF" }}
                thumbColor={unitSystem === "imperial" ? "#ffffff" : "#f4f3f4"}
              />
              <Text style={styles.unitLabel}>Imperial</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>About</Text>
            <Text style={styles.infoText}>Weather App v1.0.0</Text>
            <Text style={styles.infoText}>Built with Expo & React Native</Text>
            <Text style={styles.infoText}>Weather data by Open-Meteo</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  unitToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  unitLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  infoSection: {
    marginTop: 30,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});
