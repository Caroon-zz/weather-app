import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Coordinates, WeatherData } from "../types";

export interface WeatherRequestPayload {
  zipCode?: string;
  lat?: number;
  lon?: number;
}

export interface WeatherState {
  zipCode: string;
  submittedZip: string;
  coordinates: Coordinates | null;
  weatherData: WeatherData | null;
  isLoadingCoordinates: boolean;
  isLoadingWeather: boolean;
  coordinatesError: string | null;
  weatherError: string | null;
}

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

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setZipCode: (state, action: PayloadAction<string>) => {
      state.zipCode = action.payload;
    },
    fetchWeatherRequest: (
      state,
      action: PayloadAction<WeatherRequestPayload>,
    ) => {
      const { zipCode, lat, lon } = action.payload;
      if (zipCode) {
        state.submittedZip = zipCode;
        state.isLoadingCoordinates = true;
      } else if (lat !== undefined && lon !== undefined) {
        state.zipCode = ""; // Clear the zip code input field
        state.submittedZip = "";
        state.coordinates = { lat, lon };
        state.isLoadingCoordinates = false;
        state.isLoadingWeather = true;
      }

      state.coordinatesError = null;
      state.weatherError = null;
      state.weatherData = null;
    },
    fetchCoordinatesSuccess: (state, action: PayloadAction<Coordinates>) => {
      state.coordinates = action.payload;
      state.isLoadingCoordinates = false;
      state.coordinatesError = null;
      state.isLoadingWeather = true;
    },
    fetchCoordinatesFailure: (state, action: PayloadAction<string>) => {
      state.isLoadingCoordinates = false;
      state.coordinatesError = action.payload;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<WeatherData>) => {
      state.weatherData = action.payload;
      state.isLoadingWeather = false;
      state.weatherError = null;
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.isLoadingWeather = false;
      state.weatherError = action.payload;
    },
    clearWeatherData: (state) => {
      state.coordinates = null;
      state.weatherData = null;
      state.coordinatesError = null;
      state.weatherError = null;
      state.isLoadingCoordinates = false;
      state.isLoadingWeather = false;
    },
  },
});

export const {
  setZipCode,
  fetchWeatherRequest,
  fetchCoordinatesSuccess,
  fetchCoordinatesFailure,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  clearWeatherData,
} = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;
