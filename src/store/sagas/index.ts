import { all, takeLatest } from "redux-saga/effects";
import { fetchWeatherSaga } from "../../features/weather/sagas/weatherSagas";
import { fetchWeatherRequest } from "../../features/weather/slices/weatherSlice";

function* watchFetchWeather() {
  yield takeLatest(fetchWeatherRequest.type, fetchWeatherSaga);
}

export function* rootSaga() {
  yield all([watchFetchWeather()]);
}
