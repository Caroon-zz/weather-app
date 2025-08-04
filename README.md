# Weather App 🌤️

A React Native weather application built with Expo Router, TypeScript, and modern development practices.

## 🏗️ Architecture

This project follows professional React Native development patterns with a feature-based architecture and Redux Toolkit + Redux Saga for state management. Here is a comprehensive overview of the main folders:

```
src/
├── components/           # Shared, reusable UI components
│   ├── ui/               # Base UI primitives (e.g., WeatherButton, AnimatedWeatherEmoji)
│   └── index.ts          # Barrel file for component exports
│
├── features/             # Feature-based modules (domain-driven)
│   ├── weather/          # Weather feature
│   │   ├── components/   # Weather-specific UI components (WeatherCard, etc.)
│   │   ├── hooks/        # Custom React hooks (useWeather, useWeatherRedux, etc.)
│   │   ├── redux/        # Redux hooks and integration for weather
│   │   ├── sagas/        # Redux Saga logic for async flows
│   │   ├── services/     # API and data-fetching logic (e.g., weatherService)
│   │   ├── slices/       # Redux slices (weatherSlice, etc.)
│   │   ├── types/        # TypeScript interfaces and types for weather
│   │   ├── utils/        # Weather-specific utilities (weatherCodeToDescription, weatherEmoji, etc.)
│   │   └── tests/        # Feature-specific tests (optional, colocated or in __tests__)
│   └── settings/         # Settings feature (mirrors weather structure)
│
├── providers/            # React context providers (ReduxProvider, QueryProvider, etc.)
│
├── styles/               # Global and feature-specific styles, design tokens, and theming
│   ├── index.ts          # Main style exports
│   └── ...               # Style modules (e.g., weatherTabStyles.ts)
│
├── constants/            # App-wide constants (e.g., globalConstants.ts, index.ts)
│
├── hooks/                # Global custom hooks (not feature-specific)
│   ├── redux.ts          # Global Redux hooks (useAppDispatch, useAppSelector)
│   └── ...
│
├── store/                # Redux store configuration and root saga
│   ├── index.ts          # Store setup
│   ├── sagas/            # Root saga and saga composition
│   └── slices/           # (For future global slices shared across features)
│
├── utils/                # Global utility functions (unitConversions, etc.)
│
└──

assets/                   # Static assets (images, fonts, icons)
app/                      # Expo Router entry points and navigation structure
    (tabs)/               # Tab-based navigation screens and tests
    _layout.tsx           # App layout
    index.tsx             # App entry point

```

**Key Points:**

- Each feature (e.g., weather, settings) is fully modular, containing its own Redux logic, sagas, hooks, types, and tests.
- Shared logic and UI live in `components/`, `hooks/`, `styles/`, and `utils/`.
- The `app/` folder contains Expo Router navigation and screen entry points.
- Static assets (images, fonts) are in the `assets/` folder.

## 🚀 Features

- **Modern Architecture**: Feature-based organization with clear separation of concerns
- **TypeScript**: Full type safety throughout the application
- **Custom Hooks**: Reusable data fetching with Redux/Redux Toolkit/Sagas/Axios 
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Animated UI**: Smooth animations and transitions
- **Code Quality**: ESLint configuration with strict TypeScript rules

## 🛠️ Technology Stack

- **Framework**: Expo Router (React Native)
- **Language**: TypeScript
- **State Management**: Redux Toolkit + Redux Saga
- **Styling**: React Native StyleSheet with modular organization
- **HTTP Client**: Axios
- **Weather API**: Open-Meteo
- **Location API**: Zippopotam.us
- **Testing**: Jest with React Native Testing Library
- **Code Quality**: ESLint + TypeScript strict mode

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

## 🎯 Usage

1. Enter a valid 5-digit US ZIP code
2. Tap "Get Weather" to fetch current weather data
3. View detailed weather information including:
   - Temperature
   - Weather description
   - Wind speed
   - Weather code
   - Animated weather emoji

## 🧪 Testing & Code Quality

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Format code with Prettier
npx prettier --write .
```

- **Unit tests** for all Redux slices, sagas, hooks, and UI components using Jest and React Native Testing Library
- **Redux Saga** and async logic tested with `redux-saga` test helpers
- **Prettier** and **ESLint** for code formatting and linting

## 🏛️ Project Structure Details

### Components (`src/components/`)

- **UI Components**: Reusable interface elements
- **Compound Components**: Complex components built from primitives
- **Layout Components**: Structural elements for consistent layouts

### Features (`src/features/`)

Each feature module contains:

- **components/**: Feature-specific UI components
- **hooks/**: Custom React hooks
- **redux/**: Redux hooks and integration (e.g., `useWeatherRedux`)
- **sagas/**: Redux Saga side effects and async logic
- **slices/**: Redux slices for state management
- **styles/**: Stylesheets for feature level non-reusable components
- **services/**: API calls and data transformation
- **types/**: TypeScript interfaces and type definitions
- **utils/**: Helper functions and utilities

### Providers (`src/providers/`)

- **ReduxProvider**: Redux store configuration and setup
- **QueryProvider**: (Optional) React Query configuration (legacy or for future enhancements/demonstration)

### Styles (`src/styles/`)

- **Modular Styles**: Feature-specific style modules
- **Responsive Design**: Screen size and device-specific styling

## 🔧 Development Guidelines

### Code Organization

- Group related functionality into feature modules
- Keep components small and focused on single responsibilities
- Use custom hooks for Redux and async logic (e.g., `useWeatherRedux`, `useSettingsRedux`)
- Implement proper TypeScript types for all data structures
- Co-locate tests with features or in `__tests__` folders

### Styling

- Use modular StyleSheet objects
- Follow consistent naming conventions
- Implement responsive design patterns
- Maintain design system consistency

### State & Data Management

- Use Redux Toolkit for state management
- Use Redux Saga for async flows and side effects
- Implement proper loading and error states in Redux
- Handle network failures gracefully in sagas and services

### Code Quality

- Use Prettier for code formatting (`npx prettier --write .`)
- Use ESLint for linting and code consistency
- Write unit tests for all slices, sagas, hooks, and components

## 📱 Platform Support

- **iOS**: Full support with native performance
- **Android**: Full support with native performance
- **Web**: Progressive Web App capabilities

## 🔮 Future Enhancements

- [ ] Location-based weather detection
- [ ] Weather forecast (7-day)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- ZIP code geocoding by [Zippopotam.us](http://zippopotam.us/)
- Built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)
