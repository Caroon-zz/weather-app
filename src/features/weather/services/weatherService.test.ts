import axios from "axios";

import * as openmeteo from "openmeteo";
import * as weatherService from "./weatherService";

jest.mock("../utils/weatherCodeToDescription", () => ({
  getWeatherDescription: jest.fn(() => "Clear"),
}));

describe("weatherService", () => {
  describe("fetchLatLon", () => {
    it("returns coordinates on success", async () => {
      jest.spyOn(axios, "get").mockResolvedValue({
        data: { places: [{ latitude: "10.1", longitude: "20.2" }] },
      });
      const coords = await weatherService.fetchLatLon("90210");
      expect(coords).toEqual({ lat: 10.1, lon: 20.2 });
    });

    it("throws error on failure", async () => {
      jest.spyOn(axios, "get").mockRejectedValue(new Error("fail"));
      await expect(weatherService.fetchLatLon("00000")).rejects.toThrow(
        "Failed to fetch coordinates for ZIP code 00000",
      );
    });
  });

  describe("fetchWeather", () => {
    const mockCurrent = {
      variables: (idx: number) => ({
        value: () => [25, 100, 5][idx],
      }),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("returns weather data on success", async () => {
      jest
        .spyOn(openmeteo, "fetchWeatherApi")
        .mockResolvedValue([{ current: () => mockCurrent } as any]);
      const data = await weatherService.fetchWeather("10.1", "20.2");
      expect(data).toEqual({
        temperature: 25,
        weathercode: 100,
        windspeed: 5,
        description: "Clear",
      });
    });

    it("throws error on failure", async () => {
      jest
        .spyOn(openmeteo, "fetchWeatherApi")
        .mockRejectedValue(new Error("fail"));
      await expect(weatherService.fetchWeather("0", "0")).rejects.toThrow(
        "Failed to fetch weather data for coordinates 0, 0",
      );
    });
  });
});
