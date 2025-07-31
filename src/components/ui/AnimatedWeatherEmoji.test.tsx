import { render } from "@testing-library/react-native";
import React from "react";
import { getWeatherEmoji } from "../../features/weather/utils/weatherEmoji";
import { AnimatedWeatherEmoji } from "./AnimatedWeatherEmoji";

describe("AnimatedWeatherEmoji", () => {
  it("renders the correct emoji for a given code", () => {
    const { getByText } = render(
      <AnimatedWeatherEmoji code={2} desc="Partly Cloudy" />,
    );
    expect(getByText(getWeatherEmoji(2))).toBeTruthy();
  });

  it("renders with the correct style", () => {
    const { getByText } = render(
      <AnimatedWeatherEmoji code={1} desc="Sunny" />,
    );
    const emoji = getByText(getWeatherEmoji(1));
    expect(emoji.props.style).toBeDefined();
  });

  it("renders different emoji for different codes", () => {
    const { getByText, rerender } = render(
      <AnimatedWeatherEmoji code={1} desc="Sunny" />,
    );
    expect(getByText(getWeatherEmoji(1))).toBeTruthy();
    rerender(<AnimatedWeatherEmoji code={99} desc="Tornado" />);
    expect(getByText(getWeatherEmoji(99))).toBeTruthy();
  });
});
