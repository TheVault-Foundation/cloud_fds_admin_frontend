import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import API from "../../network/API";
import { path } from "ramda";

function* updateUser(action) {
  let response = null;
  try {
    console.log("action.params", action);
    const userId = action.params.userId;
    const body = action.params.body;
    response = yield API.updateUser(userId, body);

    if (response.status === 204) {
      const userInfoResponse = yield API.getUserInfo(userId, body);
      
      if (action.onComplete) {
        action.onComplete(userInfoResponse);
      }

      if (userInfoResponse.status === 200) {

        const data = path(["data", "item"], userInfoResponse)

        yield put({
          type: types.USER_UPDATE_SUCCEEDED,
          data: {
            ...data
          }
        });
      }

    } else {
      yield put({
        type: types.USER_UPDATE_FAILED,
        error: response
      });
    }
  } catch (error) {
    if (action.onComplete) {
      action.onComplete(error);
    }
    yield put({ type: types.USER_UPDATE_FAILED, error });
  }
}

export function* watchUpdateUser() {
  yield takeLatest(types.USER_UPDATE_REQUESTED, updateUser);
}
