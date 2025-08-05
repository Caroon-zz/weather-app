import * as Location from "expo-location";
import { Alert } from "react-native";
import { fetchGeolocationCoordinates } from "./fetchGeolocationCoordinates";

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  Accuracy: {
    Balanced: "balanced",
  },
}));

jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

const mockRequestPermissions =
  Location.requestForegroundPermissionsAsync as jest.MockedFunction<
    typeof Location.requestForegroundPermissionsAsync
  >;
const mockGetCurrentPosition =
  Location.getCurrentPositionAsync as jest.MockedFunction<
    typeof Location.getCurrentPositionAsync
  >;
const mockAlert = Alert.alert as jest.MockedFunction<typeof Alert.alert>;

describe("fetchGeolocationCoordinates", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  describe("successful location fetch", () => {
    it("returns coordinates when permission is granted and location is available", async () => {
      const mockLocation = {
        coords: {
          latitude: 40.7128,
          longitude: -74.006,
          altitude: null,
          accuracy: 10,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      };

      mockRequestPermissions.mockResolvedValue({ status: "granted" } as any);
      mockGetCurrentPosition.mockResolvedValue(mockLocation);

      const result = await fetchGeolocationCoordinates();

      expect(result).toEqual({
        latitude: 40.7128,
        longitude: -74.006,
      });
      expect(mockRequestPermissions).toHaveBeenCalledTimes(1);
      expect(mockGetCurrentPosition).toHaveBeenCalledWith({
        accuracy: Location.Accuracy.Balanced,
      });
      expect(mockAlert).not.toHaveBeenCalled();
    });

    it("handles different coordinate values correctly", async () => {
      const mockLocation = {
        coords: {
          latitude: -33.8688,
          longitude: 151.2093,
          altitude: null,
          accuracy: 5,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      };

      mockRequestPermissions.mockResolvedValue({ status: "granted" } as any);
      mockGetCurrentPosition.mockResolvedValue(mockLocation);

      const result = await fetchGeolocationCoordinates();

      expect(result).toEqual({
        latitude: -33.8688,
        longitude: 151.2093,
      });
    });
  });

  describe("permission handling", () => {
    it("returns null and shows alert when permission is denied", async () => {
      mockRequestPermissions.mockResolvedValue({ status: "denied" } as any);

      const result = await fetchGeolocationCoordinates();

      expect(result).toBeNull();
      expect(mockRequestPermissions).toHaveBeenCalledTimes(1);
      expect(mockGetCurrentPosition).not.toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith(
        "Permission Required",
        "Location permission is required to get your current location.",
        [{ text: "OK" }],
      );
    });

    it("returns null and shows alert when permission is undetermined", async () => {
      mockRequestPermissions.mockResolvedValue({
        status: "undetermined",
      } as any);

      const result = await fetchGeolocationCoordinates();

      expect(result).toBeNull();
      expect(mockAlert).toHaveBeenCalledWith(
        "Permission Required",
        "Location permission is required to get your current location.",
        [{ text: "OK" }],
      );
    });

    it("handles permission request failure", async () => {
      mockRequestPermissions.mockRejectedValue(
        new Error("Permission request failed"),
      );

      const result = await fetchGeolocationCoordinates();

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        "Location error:",
        expect.any(Error),
      );
      expect(mockAlert).toHaveBeenCalledWith(
        "Location Error",
        "Unable to get your current location. Please try again.",
        [{ text: "OK" }],
      );
    });
  });

  describe("location fetch errors", () => {
    it("handles location fetch failure and shows error alert", async () => {
      mockRequestPermissions.mockResolvedValue({ status: "granted" } as any);
      mockGetCurrentPosition.mockRejectedValue(
        new Error("Location unavailable"),
      );

      const result = await fetchGeolocationCoordinates();

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        "Location error:",
        expect.any(Error),
      );
      expect(mockAlert).toHaveBeenCalledWith(
        "Location Error",
        "Unable to get your current location. Please try again.",
        [{ text: "OK" }],
      );
    });

    it("handles timeout errors", async () => {
      mockRequestPermissions.mockResolvedValue({ status: "granted" } as any);
      mockGetCurrentPosition.mockRejectedValue(
        new Error("Location request timed out"),
      );

      const result = await fetchGeolocationCoordinates();

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        "Location error:",
        expect.objectContaining({
          message: "Location request timed out",
        }),
      );
    });

    it("handles generic location service errors", async () => {
      mockRequestPermissions.mockResolvedValue({ status: "granted" } as any);
      mockGetCurrentPosition.mockRejectedValue(
        new Error("Location services disabled"),
      );

      const result = await fetchGeolocationCoordinates();

      expect(result).toBeNull();
      expect(mockAlert).toHaveBeenCalledWith(
        "Location Error",
        "Unable to get your current location. Please try again.",
        [{ text: "OK" }],
      );
    });
  });

  describe("edge cases", () => {
    it("handles non-Error thrown objects", async () => {
      mockRequestPermissions.mockRejectedValue("String error");

      const result = await fetchGeolocationCoordinates();

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        "Location error:",
        "String error",
      );
    });

    it("correctly uses Location.Accuracy.Balanced", async () => {
      const mockLocation = {
        coords: { latitude: 0, longitude: 0 },
        timestamp: Date.now(),
      };

      mockRequestPermissions.mockResolvedValue({ status: "granted" } as any);
      mockGetCurrentPosition.mockResolvedValue(mockLocation as any);

      await fetchGeolocationCoordinates();

      expect(mockGetCurrentPosition).toHaveBeenCalledWith({
        accuracy: Location.Accuracy.Balanced,
      });
    });
  });
});
