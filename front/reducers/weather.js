import { all, call, fork, put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import {
  WEATHER_FAILURE,
  WEATHER_REQUEST,
  WEATHER_SUCCESS,
} from "../reducers/weather";

function weatherAPI(data) {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=21bda8e399d110518c102ec4ec22ffa5`
  );
}

function* weather(action) {
  try {
    const result = yield call(weatherAPI, action.data);
    yield put({
      type: WEATHER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: WEATHER_FAILURE,
      data: err.response?.data,
    });
  }
}

function* watchWeather() {
  yield takeLatest(WEATHER_REQUEST, weather);
}

export default function* weatherSaga() {
  yield all([fork(watchWeather)]);
}
