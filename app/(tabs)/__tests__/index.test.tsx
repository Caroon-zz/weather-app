import { render } from "@testing-library/react-native";
import React from "react";
import WeatherApp from "../index";

jest.mock("expo-router", () => ({
  useNavigation: () => ({ setOptions: jest.fn() }),
}));

jest.mock("../../../src/features/weather/redux/useWeatherRedux", () => ({
  useWeatherRedux: () => ({
    zipCode: "",
    submittedZip: "",
    weatherData: null,
    isLoading: false,
    error: null,
    updateZipCode: jest.fn(),
    fetchWeather: jest.fn(),
  }),
}));

jest.mock("../../../src/features/settings/redux/useSettingsRedux", () => ({
  useSettingsRedux: () => ({ unitSystem: "metric" }),
}));

jest.mock("../../../src/hooks/useTabBar", () => ({
  useTabBarPadding: () => ({}),
}));

describe("WeatherApp", () => {
  it("renders Weather title and input", () => {
    const { getByText, getByPlaceholderText } = render(<WeatherApp />);
    expect(getByText("Weather")).toBeTruthy();
    expect(getByPlaceholderText("Enter ZIP code")).toBeTruthy();
  });

  it("renders Get Weather button", () => {
    const { getByText } = render(<WeatherApp />);
    expect(getByText("Get Weather")).toBeTruthy();
  });
});
