import * as Location from "expo-location";
import { Alert } from "react-native";

export interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

export const fetchGeolocationCoordinates =
  async (): Promise<GeolocationCoordinates | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Location permission is required to get your current location.",
          [{ text: "OK" }],
        );
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;
      return { latitude, longitude };
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert(
        "Location Error",
        "Unable to get your current location. Please try again.",
        [{ text: "OK" }],
      );
      return null;
    }
  };
