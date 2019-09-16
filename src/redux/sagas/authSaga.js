import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import { API } from "../../network/API";

function* login(action) {
  let response = null;
  try {
    response = yield call(API.login, action.params);
    if (action.onComplete) {
      action.onComplete(response);
    }

    if (response.status === 200) {
      yield put({
        type: types.USER_LOGIN_SUCCEEDED,
        data: {
          ...response.data
        }
      });
    } else {
      console.log(response.message);
      yield put({
        type: types.USER_LOGIN_FAILED,
        error: response
      });
    }
  } catch (error) {
    yield put({ type: types.USER_LOGIN_FAILED, error });
  }
}

export function* watchLogin() {
  yield takeLatest(types.USER_LOGIN_REQUESTED, login);
}
