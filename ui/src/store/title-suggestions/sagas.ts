import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getSuggestionsRequest,
  getSuggestionsRequestSuccess,
  getSuggestionsRequestFailure,
} from "./slices";
import http from "@/shared/api/http";
import { addToast } from "../toast/slices";
import { SuggestionItem } from "@/shared/models";

function* handleGetSuggestionsRequest() {
  yield takeLatest(getSuggestionsRequest, function* (action) {
    if (!getSuggestionsRequest.match(action)) {
      return;
    }
    try {
      if (action.payload.fileName === "") {
        yield put(
          addToast({
            id: Date.now().toString(),
            title: "Error",
            description: `File is required to get suggestions.`,
            type: "error",
          }),
        );
        yield put(getSuggestionsRequestFailure());
        return;
      }
      const res = yield call(http.post, "/suggestions/document-creation", {
        ...action.payload,
      });

      if (res.status != 200 || !res.data.data.success) {
        yield put(getSuggestionsRequestFailure());
        return;
      }

      const data = res.data.data;
      const result: SuggestionItem[] = data.suggestions;
      yield put(getSuggestionsRequestSuccess(result));
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
      yield put(getSuggestionsRequestFailure());
    }
  });
}

export default function* getSuggestionsSagas() {
  yield all([handleGetSuggestionsRequest()]);
}
