import type { Coordinates, WeatherData } from "../types";
import type { WeatherState } from "./weatherSlice";
import {
  clearWeatherData,
  fetchCoordinatesFailure,
  fetchCoordinatesSuccess,
  fetchWeatherFailure,
  fetchWeatherRequest,
  fetchWeatherSuccess,
  setZipCode,
  weatherReducer,
} from "./weatherSlice";

describe("weatherSlice", () => {
  const initialState: WeatherState = {
    zipCode: "",
    submittedZip: "",
    coordinates: null,
    weatherData: null,
    isLoadingCoordinates: false,
    isLoadingWeather: false,
    coordinatesError: null,
    weatherError: null,
  };

  it("setZipCode sets zipCode", () => {
    const state = weatherReducer(initialState, setZipCode("90210"));
    expect(state.zipCode).toBe("90210");
  });

  it("fetchWeatherRequest sets submittedZip and resets loading/errors", () => {
    const state = weatherReducer(
      initialState,
      fetchWeatherRequest({ zipCode: "12345" }),
    );
    expect(state.submittedZip).toBe("12345");
    expect(state.isLoadingCoordinates).toBe(true);
    expect(state.coordinatesError).toBeNull();
    expect(state.weatherError).toBeNull();
    expect(state.coordinates).toBeNull();
    expect(state.weatherData).toBeNull();
  });

  it("fetchWeatherRequest with coordinates sets coordinates and starts weather loading", () => {
    const state = weatherReducer(
      initialState,
      fetchWeatherRequest({ lat: 40.7128, lon: -74.006 }),
    );
    expect(state.coordinates).toEqual({ lat: 40.7128, lon: -74.006 });
    expect(state.isLoadingCoordinates).toBe(false);
    expect(state.isLoadingWeather).toBe(true);
    expect(state.zipCode).toBe(""); // Should clear zip code
    expect(state.submittedZip).toBe(""); // Should clear submitted zip
  });

  it("fetchCoordinatesSuccess sets coordinates and loading flags", () => {
    const coords: Coordinates = { lat: 1, lon: 2 };
    const prev = { ...initialState, isLoadingCoordinates: true };
    const state = weatherReducer(prev, fetchCoordinatesSuccess(coords));
    expect(state.coordinates).toEqual(coords);
    expect(state.isLoadingCoordinates).toBe(false);
    expect(state.coordinatesError).toBeNull();
    expect(state.isLoadingWeather).toBe(true);
  });

  it("fetchCoordinatesFailure sets coordinatesError and stops loading", () => {
    const prev = { ...initialState, isLoadingCoordinates: true };
    const state = weatherReducer(prev, fetchCoordinatesFailure("fail"));
    expect(state.isLoadingCoordinates).toBe(false);
    expect(state.coordinatesError).toBe("fail");
  });

  it("fetchWeatherSuccess sets weatherData and stops loading", () => {
    const data: WeatherData = {
      temperature: 20,
      weathercode: 100,
      windspeed: 5,
      description: "Clear",
    };
    const prev = { ...initialState, isLoadingWeather: true };
    const state = weatherReducer(prev, fetchWeatherSuccess(data));
    expect(state.weatherData).toEqual(data);
    expect(state.isLoadingWeather).toBe(false);
    expect(state.weatherError).toBeNull();
  });

  it("fetchWeatherFailure sets weatherError and stops loading", () => {
    const prev = { ...initialState, isLoadingWeather: true };
    const state = weatherReducer(prev, fetchWeatherFailure("fail"));
    expect(state.isLoadingWeather).toBe(false);
    expect(state.weatherError).toBe("fail");
  });

  it("clearWeatherData resets relevant state", () => {
    const prev: WeatherState = {
      zipCode: "1",
      submittedZip: "2",
      coordinates: { lat: 1, lon: 2 },
      weatherData: {
        temperature: 20,
        weathercode: 100,
        windspeed: 5,
        description: "Clear",
      },
      isLoadingCoordinates: true,
      isLoadingWeather: true,
      coordinatesError: "err",
      weatherError: "err",
    };
    const state = weatherReducer(prev, clearWeatherData());
    expect(state.coordinates).toBeNull();
    expect(state.weatherData).toBeNull();
    expect(state.coordinatesError).toBeNull();
    expect(state.weatherError).toBeNull();
    expect(state.isLoadingCoordinates).toBe(false);
    expect(state.isLoadingWeather).toBe(false);
    // zipCode and submittedZip are not reset
    expect(state.zipCode).toBe("1");
    expect(state.submittedZip).toBe("2");
  });
});
