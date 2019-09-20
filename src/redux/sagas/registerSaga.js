import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import API from "../../network/API";

function* register(action) {
  let response = null;
  try {
    response = yield API.register(action.params);
    if (action.onComplete) {
      action.onComplete(response);
    }

    if (response.status === 201) {
      yield put({
        type: types.USER_SIGNUP_SUCCEEDED,
        data: {
          ...response.data
        }
      });
    } else {
      yield put({
        type: types.USER_SIGNUP_FAILED,
        error: response
      });
    }
  } catch (error) {
    if (action.onComplete) {
      action.onComplete(error);
    }
    yield put({ type: types.USER_SIGNUP_FAILED, error });
  }
}

export function* watchRegister() {
  yield takeLatest(types.USER_SIGNUP_REQUESTED, register);
}
