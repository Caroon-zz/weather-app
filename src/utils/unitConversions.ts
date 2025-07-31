export const convertTemperature = (
  celsius: number,
  toUnit: "metric" | "imperial",
): number => {
  if (toUnit === "imperial") {
    return (celsius * 9) / 5 + 32;
  }
  return celsius;
};

export const convertWindSpeed = (
  kmh: number,
  toUnit: "metric" | "imperial",
): number => {
  if (toUnit === "imperial") {
    return kmh * 0.621371;
  }
  return kmh;
};

export const getTemperatureUnit = (
  unitSystem: "metric" | "imperial",
): string => {
  return unitSystem === "metric" ? "°C" : "°F";
};

export const getWindSpeedUnit = (unitSystem: "metric" | "imperial"): string => {
  return unitSystem === "metric" ? "km/h" : "mph";
};
