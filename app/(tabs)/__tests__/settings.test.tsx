import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import SettingsScreen from "../settings";

const mockUpdateUnitSystem = jest.fn();

jest.mock("../../../src/features/settings/redux/useSettingsRedux", () => ({
  useSettingsRedux: () => ({
    unitSystem: "metric",
    updateUnitSystem: mockUpdateUnitSystem,
  }),
}));

jest.mock("../../../src/hooks/useTabBar", () => ({
  useTabBarPadding: () => ({ paddingBottom: 80 }),
}));

describe("SettingsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders settings title", () => {
      const { getByText } = render(<SettingsScreen />);
      expect(getByText("Settings")).toBeTruthy();
    });

    it("renders unit toggle section", () => {
      const { getByText } = render(<SettingsScreen />);
      expect(getByText("Units")).toBeTruthy();
      expect(getByText("Metric")).toBeTruthy();
      expect(getByText("Imperial")).toBeTruthy();
    });

    it("renders about section", () => {
      const { getByText } = render(<SettingsScreen />);
      expect(getByText("About")).toBeTruthy();
      expect(getByText("Weather App v1.0.0")).toBeTruthy();
      expect(getByText("Built with Expo & React Native")).toBeTruthy();
      expect(getByText("Weather data by Open-Meteo")).toBeTruthy();
    });

    it("renders attribution text", () => {
      const { getByText } = render(<SettingsScreen />);
      expect(
        getByText(
          "Weather code mapping inspired by weather-sense (github.com/erikflowers/weather-sense)",
        ),
      ).toBeTruthy();
      expect(
        getByText("Weather icons by Airycons (airycons.com)"),
      ).toBeTruthy();
    });
  });

  describe("Unit System Toggle", () => {
    it("calls updateUnitSystem with imperial when toggled to true", () => {
      const { getByRole } = render(<SettingsScreen />);
      const toggle = getByRole("switch");

      fireEvent(toggle, "valueChange", true);
      expect(mockUpdateUnitSystem).toHaveBeenCalledWith("imperial");
    });

    it("calls updateUnitSystem with metric when toggled to false", () => {
      const { getByRole } = render(<SettingsScreen />);
      const toggle = getByRole("switch");

      fireEvent(toggle, "valueChange", false);
      expect(mockUpdateUnitSystem).toHaveBeenCalledWith("metric");
    });

    it("renders switch component", () => {
      const { getByRole } = render(<SettingsScreen />);
      const toggle = getByRole("switch");
      expect(toggle).toBeTruthy();
    });
  });

  describe("Layout and Styling", () => {
    it("has proper container structure", () => {
      const { getByText } = render(<SettingsScreen />);
      const settingsTitle = getByText("Settings");
      const aboutTitle = getByText("About");
      const unitsLabel = getByText("Units");

      expect(settingsTitle).toBeTruthy();
      expect(aboutTitle).toBeTruthy();
      expect(unitsLabel).toBeTruthy();
    });
  });
});
