module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo|expo-font|expo-asset|@expo/vector-icons|@unimodules|unimodules|sentry-expo|native-base)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/features/(.*)$": "<rootDir>/src/features/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@/providers/(.*)$": "<rootDir>/src/providers/$1",
  },
};
