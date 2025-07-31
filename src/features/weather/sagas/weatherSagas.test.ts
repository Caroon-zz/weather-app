import { runSaga } from "redux-saga";
import * as weatherService from "../services/weatherService";
import {
  fetchCoordinatesFailure,
  fetchCoordinatesSuccess,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from "../slices/weatherSlice";
import { fetchWeatherSaga } from "./weatherSagas";

const mockCoordinates = { lat: 1, lon: 2 };
const mockWeatherData = {
  temperature: 20,
  weathercode: 100,
  windspeed: 5,
  description: "Clear",
};

describe("fetchWeatherSaga", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches success actions when both API calls succeed", async () => {
    jest
      .spyOn(weatherService, "fetchLatLon")
      .mockResolvedValue(mockCoordinates);
    jest
      .spyOn(weatherService, "fetchWeather")
      .mockResolvedValue(mockWeatherData);
    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchWeatherSaga,
      { type: "weather/fetchWeatherRequest", payload: "12345" },
    ).toPromise();
    expect(dispatched).toEqual([
      fetchCoordinatesSuccess(mockCoordinates),
      fetchWeatherSuccess(mockWeatherData),
    ]);
  });

  it("dispatches fetchCoordinatesFailure if fetchLatLon fails with coordinates error", async () => {
    jest
      .spyOn(weatherService, "fetchLatLon")
      .mockRejectedValue(new Error("coordinates not found"));
    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchWeatherSaga,
      { type: "weather/fetchWeatherRequest", payload: "12345" },
    ).toPromise();
    expect(dispatched).toEqual([
      fetchCoordinatesFailure("coordinates not found"),
    ]);
  });

  it("dispatches fetchWeatherFailure if fetchWeather fails with other error", async () => {
    jest
      .spyOn(weatherService, "fetchLatLon")
      .mockResolvedValue(mockCoordinates);
    jest
      .spyOn(weatherService, "fetchWeather")
      .mockRejectedValue(new Error("weather API down"));
    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchWeatherSaga,
      { type: "weather/fetchWeatherRequest", payload: "12345" },
    ).toPromise();
    expect(dispatched).toEqual([
      fetchCoordinatesSuccess(mockCoordinates),
      fetchWeatherFailure("weather API down"),
    ]);
  });

  it("dispatches fetchWeatherFailure with generic message if error is not an Error instance", async () => {
    jest.spyOn(weatherService, "fetchLatLon").mockImplementation(() => {
      throw "fail";
    });
    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchWeatherSaga,
      { type: "weather/fetchWeatherRequest", payload: "12345" },
    ).toPromise();
    expect(dispatched).toEqual([fetchWeatherFailure("Unknown error occurred")]);
  });
});
