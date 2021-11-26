import {
  all,
  call,
  delay,
  fork,
  put,
  takeLatest,
} from "@redux-saga/core/effects";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from "../reducers/post";
import shortid from "shortid";
import axios from "axios";
import { ADD_POST_OF_USER } from "../reducers/user";

function addPostAPI(data) {
  return axios.post();
}

function* addPost(action) {
  console.log("saga-post.js : ", action);
  try {
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000);
    const id = shortid.generate(); // postId
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
        user: action.user,
        // {id : userInfo.id, nickname : userInfo.nickname}
      },
    });
    yield put({
      type: ADD_POST_OF_USER,
      data: {
        id,
        content: action.data,
      },
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* addComment(action) {
  try {
    //const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
      // { content: commentText, postId: post.id, userId: id, nickname }
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
