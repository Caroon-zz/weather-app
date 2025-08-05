import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { WeatherButton, WeatherButtonProps } from "./WeatherButton";

const defaultProps: WeatherButtonProps = {
  title: "Test Button",
  onPress: jest.fn(),
};

describe("WeatherButton", () => {
  it("renders the button with the correct title", () => {
    const { getByText } = render(<WeatherButton {...defaultProps} />);
    expect(getByText("Test Button")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <WeatherButton {...defaultProps} onPress={onPressMock} />,
    );
    fireEvent.press(getByText("Test Button"));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <WeatherButton {...defaultProps} disabled={true} onPress={onPressMock} />,
    );
    fireEvent.press(getByText("Test Button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("applies custom color", () => {
    const { getByText } = render(
      <WeatherButton {...defaultProps} color="#FF0000" />,
    );
    expect(getByText("Test Button")).toBeTruthy();
  });
});
