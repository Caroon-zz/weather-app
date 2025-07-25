module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo|expo-font|expo-asset|@expo/vector-icons|@unimodules|unimodules|sentry-expo|native-base)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleDirectories: ['node_modules', 'app'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
  },
};
