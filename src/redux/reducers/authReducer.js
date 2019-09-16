import * as types from "../actions/types";
import { enableInitializing } from "initializable-reducer";

const INITIAL = {
  data: {},
  loading: false,
  error: false
};

const authReducer = enableInitializing((state = INITIAL, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case types.USER_LOGIN_SUCCEEDED:
      return {
        ...state,
        data: action.data || {},
        error: null,
        loading: false
      };
    case types.USER_LOGIN_FAILED:
      return {
        ...state,
        data: {},
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
});

export default authReducer;
