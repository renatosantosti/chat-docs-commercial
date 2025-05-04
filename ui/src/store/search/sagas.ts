import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import {
  searchRequest,
  searchRequestSuccess,
  searchRequestFailure,
  SearchResult,
} from "./slices";
import http from "@/shared/api/http";
import { addToast } from "../toast/slices";

function* handleSearchRequest() {
  yield takeLatest(searchRequest, function* (action) {
    if (!searchRequest.match(action)) {
      return;
    }
    try {
      if (action.payload.term === "") {
        yield put(
          addToast({
            id: Date.now().toString(),
            title: "Error",
            description: `Please enter the term to search.`,
            type: "error",
          }),
        );
        return;
      }
      const res = yield call(http.post, "/search", {
        mode: action.payload.mode,
        term: action.payload.term,
      });

      if (res.status != 200 || !res.data.data.success) {
        yield put(searchRequestFailure());
        return;
      }

      const data = res.data.data;
      const result: SearchResult = {
        term: action.payload.term,
        pages: data.result.map((page: any) => ({
          pageId: page.pageNumber,
          documentId: page.documentId,
          documentName: page.documentName,
          pageNumber: page.pageNumber,
          content: page.content,
        })),
      };
      // force loading at least 1,5 seconds
      yield delay(700);
      yield put(searchRequestSuccess(result));
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
      yield put(searchRequestFailure());
    }
  });
}

export default function* searchSagas() {
  yield all([handleSearchRequest()]);
}
