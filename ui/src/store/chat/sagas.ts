import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import {
  chatRequest,
  chatRequestSuccess,
  chatRequestFailure,
  ChatResult,
} from "./slices";
import http from "@/shared/api/http";
import { addToast } from "../toast/slices";

function* handleChatRequest() {
  yield takeLatest(chatRequest, function* (action) {
    if (!chatRequest.match(action)) {
      return;
    }

    try {
      const mode = action.payload.mode;
      if (action.payload.term === "") {
        yield put(
          addToast({
            id: Date.now().toString(),
            title: "Error",
            description: `Please enter the ${mode === "chat" ? "question" : "term to search"}.`,
            type: "error",
          }),
        );
        return;
      }

      if (mode === "chat") {
        const res = yield call(http.post, "/chat-doc", {
          documentId: action.payload.documentId,
          question: action.payload.term,
          previousQuestion: "",
          previousResponse: "",
        });

        if (res.status != 200 || !res.data.data.success) {
          yield put(
            addToast({
              id: Date.now().toString(),
              title: "Error",
              description: res.data.data.message,
              type: "error",
            }),
          );
          yield put(chatRequestFailure());
          return;
        }

        const data = res.data.data;
        const result: ChatResult = {
          documentId: action.payload.documentId,
          term: action.payload.term,
          pages: data.result.pages.map((page: any) => ({
            pageId: page.pageNumber,
            documentId: page.documentId,
            documentName: page.documentName,
            pageNumber: page.pageNumber,
            content: page.content,
          })),
          response: data.result.response,
        };

        yield put(chatRequestSuccess(result));
        return;
      }

      // When mode is search
      const res = yield call(http.post, "/search", {
        mode,
        term: action.payload.term,
        documentId: action.payload.documentId,
      });

      if (res.status != 200 || !res.data.data.success) {
        yield put(chatRequestFailure());

        return;
      }

      const data = res.data.data;
      const result: ChatResult = {
        documentId: action.payload.documentId,
        term: action.payload.term,
        pages: data.result.map((page: any) => ({
          pageId: page.pageNumber,
          documentId: page.documentId,
          documentName: page.documentName,
          pageNumber: page.pageNumber,
          content: page.content,
        })),
        response: undefined,
      };
      // force loading at least 1,5 seconds - because this filter is so fast actually
      yield delay(700);
      yield put(chatRequestSuccess(result));
    } catch (err) {
      // Extract detailed error message from HTTP response
      const errorMessage =
        err.response?.data?.data?.message ||
        err.message ||
        "An unexpected error occurred.";

      console.error("HTTP Error:", err);
      yield put(
        addToast({
          id: Date.now().toString(),
          title: "Error",
          description: errorMessage,
          type: "error",
        }),
      );
      yield put(chatRequestFailure());
      return;
    }
  });
}

export default function* chatSagas() {
  yield all([handleChatRequest()]);
}
