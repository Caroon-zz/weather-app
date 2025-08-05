import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { fetchLatLon, fetchWeather } from "../services/weatherService";
import {
  fetchCoordinatesSuccess,
  fetchWeatherFailure,
  fetchWeatherSuccess,
  WeatherRequestPayload,
} from "../slices/weatherSlice";
import type { Coordinates, WeatherData } from "../types";

export function* fetchWeatherSaga(
  action: PayloadAction<WeatherRequestPayload>,
) {
  try {
    const { zipCode, lat, lon } = action.payload;
    let coordinates: Coordinates;

    if (zipCode) {
      try {
        coordinates = yield call(fetchLatLon, zipCode);
        yield put(fetchCoordinatesSuccess(coordinates));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        yield put(fetchWeatherFailure(errorMessage));
        return;
      }
    } else if (lat !== undefined && lon !== undefined) {
      coordinates = { lat, lon };
    } else {
      yield put(
        fetchWeatherFailure("Please provide either a zip code or coordinates"),
      );
      return;
    }

    const weatherData: WeatherData = yield call(
      fetchWeather,
      String(coordinates.lat),
      String(coordinates.lon),
    );
    yield put(fetchWeatherSuccess(weatherData));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    yield put(fetchWeatherFailure(errorMessage));
  }
}
