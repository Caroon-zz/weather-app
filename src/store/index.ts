import { configureStore } from "@reduxjs/toolkit";
import { settingsReducer } from "../features/settings/slices/settingsSlice";
import { weatherReducer } from "../features/weather/slices/weatherSlice";
import { rootSaga } from "./sagas/index";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const createSagaMiddleware = require("redux-saga").default;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ["saga/start", "saga/end"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
