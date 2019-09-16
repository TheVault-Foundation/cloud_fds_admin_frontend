import { all } from "redux-saga/effects";

import { watchLogin } from "./authSaga";
import { watchRegister } from "./registerSaga";

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister()
  ]);
}
