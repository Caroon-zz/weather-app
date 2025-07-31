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

  it("renders loading state", () => {
    mockUseWeatherRedux.mockReturnValue({
      weatherData: null,
      isLoading: true,
      error: null,
      fetchWeather: jest.fn(),
    });
    const { getByText } = render(<WeatherCard zip="12345" />);
    expect(getByText("Loading weather data...")).toBeTruthy();
  });

  it("renders error state for invalid ZIP", () => {
    mockUseWeatherRedux.mockReturnValue({
      weatherData: null,
      isLoading: false,
      error: "coordinates",
      fetchWeather: jest.fn(),
    });
    const { getByText } = render(<WeatherCard zip="00000" />);
    expect(getByText("Invalid ZIP code. Please try again.")).toBeTruthy();
  });

  it("renders error state for fetch failure", () => {
    mockUseWeatherRedux.mockReturnValue({
      weatherData: null,
      isLoading: false,
      error: "network",
      fetchWeather: jest.fn(),
    });
    const { getByText } = render(<WeatherCard zip="00000" />);
    expect(
      getByText("Failed to fetch weather data. Please try again."),
    ).toBeTruthy();
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
    expect(getByText("11 km/h")).toBeTruthy();
    expect(getByText("1")).toBeTruthy();
  });

  it("calls onDescription and onWeatherCode when weatherData changes", () => {
    const onDescription = jest.fn();
    const onWeatherCode = jest.fn();
    mockUseWeatherRedux.mockReturnValue({
      weatherData: {
        description: "Cloudy",
        temperature: 18,
        windspeed: 5,
        weathercode: 3,
      },
      isLoading: false,
      error: null,
      fetchWeather: jest.fn(),
    });
    render(
      <WeatherCard
        zip="12345"
        onDescription={onDescription}
        onWeatherCode={onWeatherCode}
      />,
    );
    expect(onDescription).toHaveBeenCalledWith("Cloudy");
    expect(onWeatherCode).toHaveBeenCalledWith(3);
  });
});
