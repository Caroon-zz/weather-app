# Test Coverage Guide

## Running Coverage Reports

### Basic Coverage

```bash
npm run test:coverage
```

### Watch Mode with Coverage

```bash
npm run test:coverage:watch
```

### Open Coverage Report in Browser (Windows)

```bash
npm run test:coverage:open
```

### Strict Coverage Threshold

```bash
npm run test:coverage:threshold
```

## Understanding Coverage Reports

### Coverage Types

- **Lines**: Percentage of executable lines covered
- **Functions**: Percentage of functions called
- **Branches**: Percentage of decision branches taken
- **Statements**: Percentage of statements executed

### Coverage Thresholds

- **Global**: 70% minimum for all metrics
- **Weather Feature**: 80% minimum (higher standard for core feature)

## Coverage Files

- `coverage/lcov-report/index.html` - Interactive HTML report
- `coverage/lcov.info` - LCOV format for CI/CD
- `coverage/coverage-final.json` - JSON format
- Terminal output shows summary

## Best Practices

1. Focus on testing critical business logic
2. Don't aim for 100% coverage - focus on meaningful tests
3. Test edge cases and error conditions
4. Mock external dependencies (APIs, location services)
5. Test user interactions and state changes

## Excluded from Coverage

- Type definition files (\*.d.ts)
- Test files themselves
- Index files that only export modules
- Redux store configuration
- Style files
