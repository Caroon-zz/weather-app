import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { fetchLatLon, fetchWeather } from "../services/weatherService";
import {
  fetchCoordinatesFailure,
  fetchCoordinatesSuccess,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from "../slices/weatherSlice";
import type { Coordinates, WeatherData } from "../types";

export function* fetchWeatherSaga(action: PayloadAction<string>) {
  try {
    const zipCode = action.payload;
    const coordinates: Coordinates = yield call(fetchLatLon, zipCode);
    yield put(fetchCoordinatesSuccess(coordinates));
    const weatherData: WeatherData = yield call(
      fetchWeather,
      String(coordinates.lat),
      String(coordinates.lon),
    );
    yield put(fetchWeatherSuccess(weatherData));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    if (error instanceof Error && error.message.includes("coordinates")) {
      yield put(fetchCoordinatesFailure(errorMessage));
    } else {
      yield put(fetchWeatherFailure(errorMessage));
    }
  }
}
