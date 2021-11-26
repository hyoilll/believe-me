import { all, delay, fork, put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import shortid from "shortid";
import {
  ADD_COURSE_FAILURE,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
} from "../reducers/course";
import { ADD_COURSE_OF_USER } from "../reducers/user";

function addCourseAPI(data) {
  return axios.post();
}

function* addCourse(action) {
  try {
    //const result = yield call(addCourseAPI, action.data)
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_COURSE_SUCCESS,
      data: {
        id, //courseId
        content: action.data,
        //{id, User, area, title, filePath, description}
      },
    });
    yield put({
      type: ADD_COURSE_OF_USER,
      data: {
        id,
        content: action.data,
      },
    });
  } catch (err) {
    yield put({
      type: ADD_COURSE_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddCourse() {
  yield takeLatest(ADD_COURSE_REQUEST, addCourse);
}

export default function* courseSaga() {
  yield all([fork(watchAddCourse)]);
}
