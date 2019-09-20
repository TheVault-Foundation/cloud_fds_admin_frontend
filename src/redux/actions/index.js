import * as types from "./types";

export function login(params, onComplete) {
  return {
    type: types.USER_LOGIN_REQUESTED,
    params,
    onComplete
  };
}

export function register(params, onComplete) {
  return {
    type: types.USER_SIGNUP_REQUESTED,
    params,
    onComplete
  };
}
