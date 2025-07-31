import { render } from "@testing-library/react-native";
import React from "react";
import { WeatherCard } from "./WeatherCard";

jest.mock("../redux/useWeatherRedux", () => ({
  useWeatherRedux: jest.fn(),
}));

const mockUseWeatherRedux = require("../redux/useWeatherRedux").useWeatherRedux;

describe("WeatherCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders weather data", () => {
    mockUseWeatherRedux.mockReturnValue({
      weatherData: {
        description: "Sunny",
        temperature: 25.1234,
        windspeed: 10.5678,
        weathercode: 1,
      },
      isLoading: false,
      error: null,
      fetchWeather: jest.fn(),
    });
    const { getByText } = render(<WeatherCard zip="12345" />);
    expect(getByText("Sunny")).toBeTruthy();
    expect(getByText(/25/)).toBeTruthy();
    expect(getByText("10.6 km/h")).toBeTruthy();
    expect(getByText("1")).toBeTruthy();
  });
});
