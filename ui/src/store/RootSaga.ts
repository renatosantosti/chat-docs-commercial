import { all } from "redux-saga/effects";
import authSagas from "./auth/sagas";
import documentSagas from "./document/sagas";

export default function* rootSagas() {
  yield all([
    authSagas(),
    documentSagas(),
  ]);
}
