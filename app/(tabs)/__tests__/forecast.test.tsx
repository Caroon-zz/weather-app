import { render } from "@testing-library/react-native";
import React from "react";
import ForecastScreen from "../forecast";

jest.mock("../../../src/hooks/useTabBar", () => ({
  useTabBarPadding: () => ({}),
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }) => children,
}));

describe("ForecastScreen", () => {
  it("renders 7-Day Forecast title and coming soon message", () => {
    const { getByText } = render(<ForecastScreen />);
    expect(getByText("7-Day Forecast")).toBeTruthy();
    expect(getByText("Coming Soon!")).toBeTruthy();
    expect(
      getByText("Extended weather forecast feature will be available here."),
    ).toBeTruthy();
  });
});
