export const API_ENDPOINTS = {
  ZIP_CODE: 'https://api.zippopotam.us/us',
  WEATHER: 'https://api.open-meteo.com/v1/forecast',
} as const;

export const WEATHER_PARAMS = {
  CURRENT: 'temperature_2m,weather_code,wind_speed_10m',
} as const;

export const UI_CONSTANTS = {
  ZIP_CODE_LENGTH: 5,
  ANIMATION_DURATION: {
    SPIN: 1000,
    FLY: 1700,
  },
} as const;
