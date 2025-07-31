import { fireEvent, render } from "@testing-library/react-native";
import { Button, Text } from "react-native";
import { useWeatherRedux } from "./useWeatherRedux";
import * as reduxHooks from "../../../hooks/redux";

jest.mock("../../../hooks/redux", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("../slices/weatherSlice", () => ({
  setZipCode: jest.fn((zip) => ({ type: "weather/setZipCode", payload: zip })),
  fetchWeatherRequest: jest.fn((zip) => ({
    type: "weather/fetchWeatherRequest",
    payload: zip,
  })),
  clearWeatherData: jest.fn(() => ({ type: "weather/clearWeatherData" })),
}));
const mockUseAppDispatch = reduxHooks.useAppDispatch as jest.Mock;
const mockUseAppSelector = reduxHooks.useAppSelector as jest.Mock;

describe("useWeatherRedux", () => {
  let dispatch: jest.Mock;
  beforeEach(() => {
    dispatch = jest.fn();
    mockUseAppDispatch.mockReturnValue(dispatch);
    mockUseAppSelector.mockImplementation((fn) =>
      fn({
        weather: {
          zipCode: "12345",
          submittedZip: "12345",
          coordinates: { lat: 1, lon: 2 },
          weatherData: { temperature: 20 },
          isLoadingCoordinates: false,
          isLoadingWeather: false,
          coordinatesError: null,
          weatherError: null,
        },
      }),
    );
    jest.clearAllMocks();
  });

  it("returns weather state and actions", () => {
    function TestComponent() {
      const weather = useWeatherRedux();
      return (
        <>
          <Text testID="zipCode">{weather.zipCode}</Text>
          <Text testID="submittedZip">{weather.submittedZip}</Text>
          <Text testID="coords">
            {weather.coordinates
              ? `${weather.coordinates.lat},${weather.coordinates.lon}`
              : ""}
          </Text>
          <Text testID="weatherData">
            {weather.weatherData?.temperature?.toString() ?? ""}
          </Text>
          <Text testID="isLoading">
            {weather.isLoading ? "loading" : "not-loading"}
          </Text>
          <Text testID="error">{String(weather.error ?? "")}</Text>
        </>
      );
    }
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("zipCode").children[0]).toBe("12345");
    expect(getByTestId("submittedZip").children[0]).toBe("12345");
    expect(getByTestId("coords").children[0]).toBe("1,2");
    expect(getByTestId("weatherData").children[0]).toBe("20");
    expect(getByTestId("isLoading").children[0]).toBe("not-loading");
  });

  it("updateZipCode dispatches setZipCode", () => {
    function TestComponent() {
      const { updateZipCode } = useWeatherRedux();
      return <Button title="Update" onPress={() => updateZipCode("54321")} />;
    }
    const { getByText } = render(<TestComponent />);
    fireEvent.press(getByText("Update"));
    expect(dispatch).toHaveBeenCalledWith({
      type: "weather/setZipCode",
      payload: "54321",
    });
  });

  it("fetchWeather dispatches fetchWeatherRequest", () => {
    function TestComponent() {
      const { fetchWeather } = useWeatherRedux();
      return <Button title="Fetch" onPress={() => fetchWeather("54321")} />;
    }
    const { getByText } = render(<TestComponent />);
    fireEvent.press(getByText("Fetch"));
    expect(dispatch).toHaveBeenCalledWith({
      type: "weather/fetchWeatherRequest",
      payload: "54321",
    });
  });

  it("clearWeather dispatches clearWeatherData", () => {
    function TestComponent() {
      const { clearWeather } = useWeatherRedux();
      return <Button title="Clear" onPress={clearWeather} />;
    }
    const { getByText } = render(<TestComponent />);
    fireEvent.press(getByText("Clear"));
    expect(dispatch).toHaveBeenCalledWith({ type: "weather/clearWeatherData" });
  });

  it("isLoading and error are derived correctly", () => {
    mockUseAppSelector.mockImplementation((fn) =>
      fn({
        weather: {
          isLoadingCoordinates: true,
          isLoadingWeather: false,
          coordinatesError: null,
          weatherError: "err",
        },
      }),
    );
    function TestComponent() {
      const { isLoading, error } = useWeatherRedux();
      return (
        <>
          <Text testID="isLoading">
            {isLoading ? "loading" : "not-loading"}
          </Text>
          <Text testID="error">{error ?? ""}</Text>
        </>
      );
    }
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("isLoading").children[0]).toBe("loading");
    expect(getByTestId("error").children[0]).toBe("err");
  });
});
