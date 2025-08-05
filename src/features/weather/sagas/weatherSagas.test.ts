import { runSaga } from "redux-saga";
import * as weatherService from "../services/weatherService";
import {
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
      { type: "weather/fetchWeatherRequest", payload: { zipCode: "12345" } },
    ).toPromise();
    expect(dispatched).toEqual([
      fetchCoordinatesSuccess(mockCoordinates),
      fetchWeatherSuccess(mockWeatherData),
    ]);
  });

  it("dispatches failure action when fetchLatLon fails", async () => {
    const errorMessage = "Failed to fetch coordinates";
    jest
      .spyOn(weatherService, "fetchLatLon")
      .mockRejectedValue(new Error(errorMessage));
    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchWeatherSaga,
      { type: "weather/fetchWeatherRequest", payload: { zipCode: "12345" } },
    ).toPromise();
    expect(dispatched).toEqual([fetchWeatherFailure(errorMessage)]);
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
      { type: "weather/fetchWeatherRequest", payload: { zipCode: "12345" } },
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
      { type: "weather/fetchWeatherRequest", payload: { zipCode: "12345" } },
    ).toPromise();
    expect(dispatched).toEqual([fetchWeatherFailure("Unknown error occurred")]);
  });

  describe("coordinate-based weather requests", () => {
    it("dispatches success actions when fetchWeather succeeds with coordinates", async () => {
      jest
        .spyOn(weatherService, "fetchWeather")
        .mockResolvedValue(mockWeatherData);
      const dispatched: any[] = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchWeatherSaga,
        {
          type: "weather/fetchWeatherRequest",
          payload: { lat: 40.7128, lon: -74.006 },
        },
      ).toPromise();
      expect(dispatched).toEqual([fetchWeatherSuccess(mockWeatherData)]);
    });

    it("dispatches failure action when fetchWeather fails with coordinates", async () => {
      const errorMessage = "Failed to fetch weather with coordinates";
      jest
        .spyOn(weatherService, "fetchWeather")
        .mockRejectedValue(new Error(errorMessage));
      const dispatched: any[] = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchWeatherSaga,
        {
          type: "weather/fetchWeatherRequest",
          payload: { lat: 40.7128, lon: -74.006 },
        },
      ).toPromise();
      expect(dispatched).toEqual([fetchWeatherFailure(errorMessage)]);
    });

    it("dispatches failure action when payload has neither zipCode nor coordinates", async () => {
      const dispatched: any[] = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchWeatherSaga,
        {
          type: "weather/fetchWeatherRequest",
          payload: {},
        },
      ).toPromise();
      expect(dispatched).toEqual([
        fetchWeatherFailure("Please provide either a zip code or coordinates"),
      ]);
    });
  });
});
