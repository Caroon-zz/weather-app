import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { useCoordinates, useWeatherByZip, useWeatherData } from "./useWeather";

import * as weatherRedux from "../redux/useWeatherRedux";
jest.mock("../redux/useWeatherRedux", () => ({
  useWeatherRedux: jest.fn(),
}));
const mockUseWeatherRedux = weatherRedux.useWeatherRedux as jest.Mock;

describe("useCoordinates", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns coordinates, isLoading, and error", () => {
    mockUseWeatherRedux.mockReturnValue({
      coordinates: { lat: 1, lon: 2 },
      isLoading: false,
      error: null,
      fetchWeather: jest.fn(),
    });
    function TestComponent({ zip }: { zip: string }) {
      const { data, isLoading, error } = useCoordinates(zip);
      return (
        <>
          <Text testID="coords">{data ? `${data.lat},${data.lon}` : ""}</Text>
          <Text testID="loading">{isLoading ? "loading" : "not-loading"}</Text>
          <Text testID="error">{error ?? ""}</Text>
        </>
      );
    }

    const { getByTestId } = render(<TestComponent zip="12345" />);
    expect(getByTestId("coords").children[0] ?? "").toBe("1,2");
    expect(getByTestId("loading").children[0] ?? "").toBe("not-loading");
    expect(getByTestId("error").children[0] ?? "").toBe("");
  });

  it("calls fetchWeather if zipCode is 5 digits", () => {
    const fetchWeather = jest.fn();
    mockUseWeatherRedux.mockReturnValue({
      coordinates: null,
      isLoading: false,
      error: null,
      fetchWeather,
    });
    function TestComponent({ zip }: { zip: string }) {
      useCoordinates(zip);
      return <Text>test</Text>;
    }
    render(<TestComponent zip="12345" />);
    expect(fetchWeather).toHaveBeenCalledWith("12345");
  });
});

describe("useWeatherData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns weatherData, isLoading, and error", () => {
    mockUseWeatherRedux.mockReturnValue({
      weatherData: { temperature: 20 },
      isLoading: true,
      error: "err",
    });
    function TestComponent({
      coords,
    }: {
      coords: { lat: number; lon: number };
    }) {
      const { data, isLoading, error } = useWeatherData(coords);
      return (
        <>
          <Text testID="weather">{data ? data.temperature : ""}</Text>
          <Text testID="loading">{isLoading ? "loading" : "not-loading"}</Text>
          <Text testID="error">{error ?? ""}</Text>
        </>
      );
    }

    const { getByTestId } = render(
      <TestComponent coords={{ lat: 1, lon: 2 }} />,
    );
    expect(getByTestId("weather").children[0]).toBe("20");
    expect(getByTestId("loading").children[0]).toBe("loading");
    expect(getByTestId("error").children[0]).toBe("err");
  });
});

describe("useWeatherByZip", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns weather, coordinates, isLoading, and error", () => {
    mockUseWeatherRedux.mockReturnValue({
      weatherData: { temperature: 30 },
      coordinates: { lat: 3, lon: 4 },
      isLoading: false,
      error: null,
      fetchWeather: jest.fn(),
    });
    function TestComponent({ zip }: { zip: string }) {
      const { weather, coordinates, isLoading, error } = useWeatherByZip(zip);
      return (
        <>
          <Text testID="weather">{weather ? weather.temperature : ""}</Text>
          <Text testID="coords">
            {coordinates ? `${coordinates.lat},${coordinates.lon}` : ""}
          </Text>
          <Text testID="loading">{isLoading ? "loading" : "not-loading"}</Text>
          <Text testID="error">{error ?? ""}</Text>
        </>
      );
    }

    const { getByTestId } = render(<TestComponent zip="54321" />);
    expect(getByTestId("weather").children[0] ?? "").toBe("30");
    expect(getByTestId("coords").children[0] ?? "").toBe("3,4");
    expect(getByTestId("loading").children[0] ?? "").toBe("not-loading");
    expect(getByTestId("error").children[0] ?? "").toBe("");
  });

  it("calls fetchWeather if zipCode is 5 digits", () => {
    const fetchWeather = jest.fn();
    mockUseWeatherRedux.mockReturnValue({
      weatherData: null,
      coordinates: null,
      isLoading: false,
      error: null,
      fetchWeather,
    });
    function TestComponent({ zip }: { zip: string }) {
      useWeatherByZip(zip);
      return <Text>test</Text>;
    }
    render(<TestComponent zip="54321" />);
    expect(fetchWeather).toHaveBeenCalledWith("54321");
  });
});
