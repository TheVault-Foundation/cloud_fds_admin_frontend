import { all } from "redux-saga/effects";

import { watchLogin } from "./authSaga";
import { watchRegister } from "./registerSaga";
import { watchUpdateUser } from "./updateUserSaga";

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchUpdateUser()
  ]);
}
