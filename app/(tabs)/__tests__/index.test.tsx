import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import WeatherApp from "../index";

jest.mock("expo-router", () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
  }),
}));

const mockUpdateZipCode = jest.fn();
const mockFetchWeather = jest.fn();
jest.mock("../../../src/features/weather/redux/useWeatherRedux", () => ({
  useWeatherRedux: () => ({
    zipCode: "",
    submittedZip: "",
    weatherData: null,
    isLoading: false,
    error: null,
    updateZipCode: mockUpdateZipCode,
    fetchWeather: mockFetchWeather,
  }),
}));

jest.mock("../../../src/features/settings/redux/useSettingsRedux", () => ({
  useSettingsRedux: () => ({
    unitSystem: "metric",
    updateUnitSystem: jest.fn(),
  }),
}));

jest.mock("../../../src/hooks/useTabBar", () => ({
  useTabBarPadding: () => ({ paddingBottom: 80 }),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 34, top: 44, left: 0, right: 0 }),
}));

jest.mock("../../../src/components", () => ({
  WeatherButton: ({ title, onPress, disabled }: any) => (
    <button onClick={onPress} disabled={disabled}>
      {title}
    </button>
  ),
}));

describe("WeatherApp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles zip code input", () => {
    const { getByPlaceholderText } = render(<WeatherApp />);
    const input = getByPlaceholderText("Enter ZIP code");
    fireEvent.changeText(input, "12345");
    expect(mockUpdateZipCode).toHaveBeenCalledWith("12345");
  });

  it("filters non-numeric characters from zip input", () => {
    const { getByPlaceholderText } = render(<WeatherApp />);
    const input = getByPlaceholderText("Enter ZIP code");
    fireEvent.changeText(input, "123abc45");
    expect(mockUpdateZipCode).toHaveBeenCalledWith("12345");
  });

  it("limits zip code to 5 characters", () => {
    const { getByPlaceholderText } = render(<WeatherApp />);
    const input = getByPlaceholderText("Enter ZIP code");
    fireEvent.changeText(input, "123456789");
    expect(mockUpdateZipCode).toHaveBeenCalledWith("12345");
  });
});
