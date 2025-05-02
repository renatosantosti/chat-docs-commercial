import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  chatRequest,
  chatRequestSuccess,
  chatRequestFailure,
  ChatRequest,
} from "./slices";
import http from "@/shared/api/http";

function* handleChatRequest() {
  yield takeLatest(
    [chatRequest],
    function* (action: PayloadAction<ChatRequest>) {
      if (!chatRequest.match(action)) {
        return;
      }

      try {
        if (action.payload.mode === "chat") {
          const res = yield call(http.post, "/chat", {});
          yield put(chatRequestSuccess(res.data.result));
          return;
        }
        const res = yield call(http.post, "/search", {
          mode: action.payload.mode,
          term: action.payload.term,
          documentId: action.payload.documentId,
        });
        yield put(chatRequestSuccess(res.data.result));
      } catch (err) {
        yield put(chatRequestFailure());
      }
    },
  );
}

export default function* chatSagas() {
  yield all([handleChatRequest]);
}
