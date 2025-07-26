const getWeatherEmoji = (code?: number): string => {
  if (typeof code !== 'number') return "";
  switch (true) {
    case [0, 1].includes(code):
      return "☀️";
    case [2, 3].includes(code):
      return "⛅";
    case [4, 5, 10, 11, 12, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 28, 29].includes(code):
      return "🌫️";
    case [6, 7, 8, 9, 30, 31, 32, 33, 34, 35].includes(code):
      return "🌪️🌫️";
    case [13, 17, 18, 19, 29].includes(code):
      return "⚡️";
    case [14, 15, 16, 25, 26, 27, 51, 53, 55, 56, 57, 54, 52, 50].includes(code):
      return "🌦️";
    case [20, 21, 22, 23, 24, 58, 59, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94].includes(code):
      return "❄️";
    case [61, 63, 65, 66, 67, 80, 81, 82, 60, 62, 64, 21, 22, 23, 24].includes(code):
      return "🌧️";
    case [95, 96, 97, 98, 99].includes(code):
      return "⛈️";
    case [85, 86, 89, 90, 87, 88].includes(code):
      return "🌨️";
    case [96, 99].includes(code):
      return "⛈️🌨️";
    case [77].includes(code):
      return "❄️";
    case [76].includes(code):
      return "✨";
    case [79].includes(code):
      return "🧊";
    case [36, 37, 38, 39].includes(code):
      return "🌬️";
    case [81, 82].includes(code):
      return "🌧️🌧️";
    case [83, 84].includes(code):
      return "🌨️🌧️";
    case [98].includes(code):
      return "🌪️⛈️";
    default:
      return "❔";
  }
};

export { getWeatherEmoji };

