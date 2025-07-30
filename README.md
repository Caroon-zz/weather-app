# Weather App 🌤️

A professional React Native weather application built with Expo Router, TypeScript, and modern development practices.

## 🏗️ Architecture

This project follows professional React Native development patterns with a feature-based architecture:

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   └── index.ts        # Component exports
├── features/           # Feature-based modules
│   └── weather/        # Weather feature
│       ├── components/ # Feature-specific components
│       ├── hooks/      # Custom React hooks
│       ├── services/   # API and data services
│       ├── types/      # TypeScript interfaces
│       ├── utils/      # Feature utilities
│       └── index.ts    # Feature exports
├── providers/          # React context providers
├── styles/            # Global styles and themes
├── constants/         # App-wide constants
└── ...
```

## 🚀 Features

- **Modern Architecture**: Feature-based organization with clear separation of concerns
- **TypeScript**: Full type safety throughout the application
- **Custom Hooks**: Reusable data fetching with React Query
- **Professional Styling**: Consistent design system with proper theming
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Animated UI**: Smooth animations and transitions
- **Code Quality**: ESLint configuration with strict TypeScript rules

## 🛠️ Technology Stack

- **Framework**: Expo Router (React Native)
- **Language**: TypeScript
- **State Management**: React Query (TanStack Query)
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

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🏛️ Project Structure Details

### Components (`src/components/`)
- **UI Components**: Reusable interface elements
- **Compound Components**: Complex components built from primitives
- **Layout Components**: Structural elements for consistent layouts

### Features (`src/features/`)
Each feature module contains:
- **Components**: Feature-specific UI components
- **Hooks**: Custom React hooks for data and state management
- **Services**: API calls and data transformation
- **Types**: TypeScript interfaces and type definitions
- **Utils**: Helper functions and utilities

### Providers (`src/providers/`)
- **QueryProvider**: React Query configuration and setup
- **ThemeProvider**: Design system and theming (future enhancement)

### Styles (`src/styles/`)
- **Modular Styles**: Feature-specific style modules
- **Design Tokens**: Colors, spacing, typography constants
- **Responsive Design**: Screen size and device-specific styling

## 🔧 Development Guidelines

### Code Organization
- Group related functionality into feature modules
- Keep components small and focused on single responsibilities
- Use custom hooks for complex logic and data fetching
- Implement proper TypeScript types for all data structures

### Styling
- Use modular StyleSheet objects
- Follow consistent naming conventions
- Implement responsive design patterns
- Maintain design system consistency

### Data Management
- Use React Query for server state management
- Implement proper loading and error states
- Cache API responses appropriately
- Handle network failures gracefully

## 📱 Platform Support

- **iOS**: Full support with native performance
- **Android**: Full support with native performance  
- **Web**: Progressive Web App capabilities

## 🔮 Future Enhancements

- [ ] Location-based weather detection
- [ ] Weather forecast (7-day)
- [ ] Weather alerts and notifications
- [ ] Multiple location support
- [ ] Dark mode theme
- [ ] Weather maps integration
- [ ] Offline data caching
- [ ] Widget support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- ZIP code geocoding by [Zippopotam.us](http://zippopotam.us/)
- Built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)
