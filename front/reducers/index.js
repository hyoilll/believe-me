import { all, fork } from "redux-saga/effects";

import postSaga from "./post";
import userSaga from "./user";
import courseSaga from "./course";
import weatherSaga from "./weather";

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
    fork(courseSaga),
    fork(weatherSaga),
  ]);
}
