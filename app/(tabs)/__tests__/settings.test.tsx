import { render } from "@testing-library/react-native";
import React from "react";
import SettingsScreen from "../settings";

jest.mock("../../../src/features/settings/redux/useSettingsRedux", () => ({
  useSettingsRedux: () => ({
    unitSystem: "metric",
    updateUnitSystem: jest.fn(),
  }),
}));

jest.mock("../../../src/hooks/useTabBar", () => ({
  useTabBarPadding: () => ({}),
}));

describe("SettingsScreen", () => {
  it("renders settings title and about info", () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText("Settings")).toBeTruthy();
    expect(getByText("About")).toBeTruthy();
    expect(getByText("Weather App v1.0.0")).toBeTruthy();
    expect(getByText("Built with Expo & React Native")).toBeTruthy();
    expect(getByText("Weather data by Open-Meteo")).toBeTruthy();
  });

  it("renders unit toggle and labels", () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText("Units")).toBeTruthy();
    expect(getByText("Metric")).toBeTruthy();
    expect(getByText("Imperial")).toBeTruthy();
  });
});
