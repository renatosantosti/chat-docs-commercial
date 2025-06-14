import { all } from "redux-saga/effects";
import authSagas from "./auth/sagas";
import documentSagas from "./document/sagas";
import chatSagas from "./chat/sagas";
import searchSagas from "./search/sagas";
import uploadSagas from "./upload/sagas";
import userSagas from "./user/sagas";
import getSuggestionsSagas from "./title-suggestions/sagas";

export default function* rootSagas() {
  yield all([
    authSagas(),
    documentSagas(),
    chatSagas(),
    searchSagas(),
    uploadSagas(),
    userSagas(),
    getSuggestionsSagas(),
  ]);
}
